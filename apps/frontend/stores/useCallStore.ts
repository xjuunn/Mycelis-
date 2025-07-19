import { getUserInfo } from '~/api/message/tempMessage';
import { type MediaConnection } from 'peerjs';
import type { Model } from '@mycelis/types';
export const useCallStore = defineStore("call", () => {
    // 定义通话状态
    const _callStatus = ref<'Idle' | 'Initiating' | 'Active'>('Idle');
    // 是否在后台运行
    const _isBackground = ref<boolean>(false);
    const _mediaConnectMap = new Map<string, MediaConnection>();
    const _currentConnect = ref<MediaConnection | null>(null);
    let _readyForUserPeerId: string[] = [];
    let _currentUserInfo: Ref<CallMetaData | null> = ref(null);
    type CallMetaData = { peerId: string; user: Model.User }
    const callStatus = computed(() => _callStatus.value);
    const isBackground = computed(() => _isBackground.value);
    const currentConnect = computed(() => _currentConnect.value);
    const currentUserInfo = computed(() => _currentUserInfo.value);

    function setCurrentUserInfo(userInfo: CallMetaData) {
        _currentUserInfo.value = userInfo
    }
    function setBackground(isBackground: boolean) {
        _isBackground.value = isBackground;
    }

    function setReadyForUser(userPeerId: string) {
        _readyForUserPeerId.push(userPeerId);
    }

    function setStatus(status: 'Idle' | 'Initiating' | 'Active') {
        _callStatus.value = status;
    }

    function setCurrentConnect(connect: MediaConnection) {
        setStatus('Active');
        _currentConnect.value = connect;
        navigateTo('/media');
    }

    function init() {
        usePeer().peer.on('call', async (call) => {
            if (call.metadata.errorMsg) console.warn(call.metadata.errorMsg);
            if (_callStatus.value !== 'Idle') {
                call.answer(new MediaStream());
                call.close();
                return;
            }
            setStatus('Initiating');
            call.on('error', error => {
                console.log(error);
            })
            call.on('close', () => {
                console.log("关闭了连接");
            })
            const stream = new MediaStream();
            if (_readyForUserPeerId.includes(call.peer)) {
                if (useMediaStore().option.audio || useMediaStore().option.video) {
                    const userStream = await useMediaStore().startUserMedia(useMediaStore().option.video, useMediaStore().option.audio);
                    if (userStream) userStream.getTracks().forEach(track => stream.addTrack(track));
                }
                if (useMediaStore().option.screen) {
                    const displayStream = await useMediaStore().startDisplayMedia(true);
                    if (displayStream) displayStream.getTracks().forEach(track => stream.addTrack(track));
                }
                setCurrentConnect(call);

                const hasAudio = stream.getAudioTracks().length > 0;
                const hasVideo = stream.getVideoTracks().length > 0;

                if (!hasAudio) stream.addTrack(createEmptyAudioTrack());
                if (!hasVideo) stream.addTrack(createDummyVideoTrack());
                setCurrentUserInfo(call.metadata)
            }

            call.answer(stream);
            _mediaConnectMap.set(call.peer, call);

        })
        usePeer().peer.on('disconnected', () => {
            console.log('disconnected');
        })
    }

    function connectByUser(userid: number, onreject: () => void, metadata = () => { }) {
        if (import.meta.client) getUserInfo(userid, info => connectByPeerId(info.payload.peerId, onreject, false, metadata));
    }

    async function connectByPeerId(peerId: string, onreject: () => void, trust: boolean = false, metadata: any = {}) {
        _readyForUserPeerId.push(peerId);
        let stream = new MediaStream();
        if (trust) {
            const userStream = useMediaStore().userMedia.stream;
            const displayStream = useMediaStore().displayMedia.stream;
            if (userStream) userStream.getTracks().forEach(track => stream.addTrack(track));
            if (displayStream) displayStream.getTracks().forEach(track => stream.addTrack(track));
            if (!userStream && !displayStream) {
                stream = await useMediaStore().startUserMedia(false, true);
            }

        }

        const hasAudio = stream.getAudioTracks().length > 0;
        const hasVideo = stream.getVideoTracks().length > 0;

        if (!hasAudio) stream.addTrack(createEmptyAudioTrack());
        if (!hasVideo) stream.addTrack(createDummyVideoTrack());

        let mediaConnect: MediaConnection;
        if (stream) {
            console.log("发送流：", stream.getTracks());

            mediaConnect = usePeer().peer.call(peerId, stream, {
                metadata: {
                    peerId: usePeer().peer.id,
                    user: useAppStore().user,
                    userMedia: useMediaStore().userMedia.stream !== undefined,
                    displayMedia: useMediaStore().displayMedia.stream !== undefined,
                    ...metadata
                }
            });
            
            mediaConnect.on('close', () => {
                _mediaConnectMap.delete(peerId);
                useMediaStore().userMedia.stop();
                useMediaStore().displayMedia.stop();
                onreject()
                setStatus('Idle');
                disconnect();
            })
            mediaConnect.on('stream', (stream) => {
                // _currentConnect.value = mediaConnect;
                // _mediaConnectMap.clear();
                // _callStatus.value = 'Active';
            })
            mediaConnect.on('error', (error) => {
                console.log(error);
            })
            _mediaConnectMap.set(peerId, mediaConnect);
            if (trust) {
                setCurrentConnect(mediaConnect);
            }
        }
        setStatus('Initiating');
    }

    function disconnect() {
        _mediaConnectMap.forEach(call => {
            call.close();
        })
        _currentConnect.value?.close();
        _currentUserInfo.value = null;
        setStatus('Idle');
    }

    function reset() {
        disconnect();
        _readyForUserPeerId = [];
    }


    // 构造一个空的视频轨道
    function createDummyVideoTrack(): MediaStreamTrack {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.fillRect(0, 0, 1, 1);

        const stream = canvas.captureStream();
        const [track] = stream.getVideoTracks();

        return track;
    }

    // 构造一个空的音频轨道
    function createEmptyAudioTrack(): MediaStreamTrack {
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator(); // 创建一个持续输出音频的信号发生器
        const dst = ctx.createMediaStreamDestination(); // 创建一个目标（即媒体流）

        oscillator.connect(dst); // 把信号连接到目标
        oscillator.start();

        const [track] = dst.stream.getAudioTracks(); // 获取音频轨道

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0; // 设置为 0，即静音
        oscillator.disconnect(); // 断开原来的连接
        oscillator.connect(gainNode).connect(dst); // 重连接，先经过静音

        return track;
    }


    return {
        init,
        callStatus,
        currentConnect,
        connectByUser,
        connectByPeerId,
        disconnect,
        isBackground,
        setBackground,
        setReadyForUser,
        reset,
        setCurrentUserInfo,
        currentUserInfo
    }
})