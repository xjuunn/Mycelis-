import { getUserInfo } from '~/api/message/tempMessage';
import { type MediaConnection } from 'peerjs';
export const useCallStore = defineStore("call", () => {
    // 定义通话状态
    const _callStatus = ref<'Idle' | 'Initiating' | 'Active'>('Idle');
    // 是否在后台运行
    const _isBackground = ref<boolean>(false);
    const _mediaConnectMap = new Map<string, MediaConnection>();
    const _currentConnect = ref<MediaConnection | null>(null);
    let _readyForUserPeerId: string[] = [];
    const callStatus = computed(() => _callStatus.value);
    const isBackground = computed(() => _isBackground.value);
    const readyForUserPeerId = computed(() => _readyForUserPeerId.valueOf);
    const currentConnect = computed(() => _currentConnect.value);

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
        watch(() => useMediaStore().userMedia.stream, (stream) => {
            console.log('stream改变了：', useMediaStore().userMedia.stream);

        })
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
                // const userStream = useMediaStore().userMedia.stream;
                // const displayStream = useMediaStore().displayMedia.stream;
                // console.log("x1:", userStream, displayStream);
                // if (userStream) userStream.getTracks().forEach(track => stream.addTrack(track));
                // if (displayStream) displayStream.getTracks().forEach(track => stream.addTrack(track));
                if (useMediaStore().option.audio || useMediaStore().option.video) {
                    const userStream = await useMediaStore().startUserMedia(useMediaStore().option.video, useMediaStore().option.audio);
                    if (userStream) userStream.getTracks().forEach(track => stream.addTrack(track));
                }
                if(useMediaStore().option.screen) {
                    const displayStream = await useMediaStore().startDisplayMedia(true);
                    if (displayStream) displayStream.getTracks().forEach(track => stream.addTrack(track));
                }
                setCurrentConnect(call);
            }
            // const stream = await useMediaStore().startUserMedia(true, true)
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
        // let stream = await useMediaStore().startUserMedia(true, true);
        let mediaConnect: MediaConnection;
        if (stream) {
            console.log("stream:", stream.getTracks(), trust);

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
            // mediaConnect.on('stream', (stream) => {
            //     console.log("收到stream");

            //     _currentConnect.value = mediaConnect;
            //     _mediaConnectMap.clear();
            //     _callStatus.value = 'Active';
            // })
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
        setStatus('Idle');
    }

    function reset() {
        disconnect();
        _readyForUserPeerId = [];
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
        reset
    }
})