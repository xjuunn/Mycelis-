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
    const readyForUserPeerId = computed(() => _readyForUserPeerId.valueOf)

    function setBackground(isBackground: boolean) {
        _isBackground.value = isBackground;
    }

    function setReadyForUser(userPeerId: string) {
        _readyForUserPeerId.push(userPeerId);
    }

    function setCurrentConnect(connect: MediaConnection) {
        _currentConnect.value = connect;
        console.log("当前连接：", connect);

    }

    function init() {
        usePeer().peer.on('call', async (call) => {
            call.on('error', error => {
                console.log(error);
            })
            const stream = new MediaStream();
            if (_readyForUserPeerId.includes(call.peer)) {
                const userStream = useMediaStore().userMedia.stream;
                const displayStream = useMediaStore().displayMedia.stream;
                if (userStream) userStream.getTracks().forEach(track => stream.addTrack(track));
                if (displayStream) displayStream.getTracks().forEach(track => stream.addTrack(track));
                setCurrentConnect(call);
            }
            call.answer(stream);
            _mediaConnectMap.set(call.peer, call);

        })
        usePeer().peer.on('disconnected', () => {
            console.log('disconnected');
        })
    }

    function connectByUser(userid: number, onreject: () => void) {
        if (import.meta.client) getUserInfo(userid, info => connectByPeerId(info.payload.peerId, onreject));
    }

    function connectByPeerId(peerId: string, onreject: () => void, trust: boolean = false) {
        _readyForUserPeerId.push(peerId);
        let stream = new MediaStream();
        if (trust) {
            const userStream = useMediaStore().userMedia.stream;
            const displayStream = useMediaStore().displayMedia.stream;
            if (userStream) userStream.getTracks().forEach(track => stream.addTrack(track));
            if (displayStream) displayStream.getTracks().forEach(track => stream.addTrack(track));
        }
        let mediaConnect: MediaConnection;
        if (stream) {
            mediaConnect = usePeer().peer.call(peerId, stream, {
                metadata: {
                    peerId: usePeer().peer.id,
                    user: useAppStore().user,
                    userMedia: useMediaStore().userMedia.stream !== undefined,
                    displayMedia: useMediaStore().displayMedia.stream !== undefined
                }
            });
            mediaConnect.on('close', () => {
                _mediaConnectMap.delete(peerId);
                useMediaStore().userMedia.stop();
                useMediaStore().displayMedia.stop();
                onreject()
                _callStatus.value = 'Idle';
                disconnect();
            })
            mediaConnect.on('stream', (stream) => {
                console.log("收到stream");

                _currentConnect.value = mediaConnect;
                _mediaConnectMap.clear();
                _callStatus.value = 'Active';
            })
            mediaConnect.on('error', (error) => {
                console.log(error);
            })
            mediaConnect.peerConnection.ontrack = event => {
                console.log("track回调");
            }
            _mediaConnectMap.set(peerId, mediaConnect);
            if (trust) {
                setCurrentConnect(mediaConnect);
            }
        }
        _callStatus.value = 'Initiating';
    }

    function disconnect() {
        _mediaConnectMap.forEach(call => {
            call.close();
        })
        _readyForUserPeerId = [];
        _currentConnect.value?.close();
        _callStatus.value = 'Idle';
    }

    function onConnected() {

    }


    return {
        init,
        callStatus,
        connectByUser,
        connectByPeerId,
        disconnect,
        isBackground,
        setBackground,
        setReadyForUser
    }
})