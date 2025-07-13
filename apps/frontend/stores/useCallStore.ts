import { getUserInfo } from '~/api/message/tempMessage';
import { type MediaConnection } from 'peerjs';
export const useCallStore = defineStore("call", () => {
    // 定义通话状态
    const _callStatus = ref<'Idle' | 'Initiating' | 'Active'>('Idle');
    // 是否在后台运行
    const _isBackground = ref<boolean>(false);
    const _mediaConnectMap = new Map<string, MediaConnection>();
    const _currentConnect = ref<MediaConnection | null>(null);

    const callStatus = computed(() => _callStatus.value);
    const isBackground = computed(() => _isBackground.value);

    function setBackground(isBackground: boolean) {
        _isBackground.value = isBackground;
    }

    function init() {
        usePeer().peer.on('call', (call) => {
            console.log("收到来电：", call);
            _mediaConnectMap.set(call.peer, call);
            call.on('error', error => {
                console.log(error);

            })
        })
        usePeer().peer.on('disconnected', () => {
            console.log('disconnected');
        })
    }

    function connect(userid: number, onreject: () => void) {
        if (import.meta.client) {
            getUserInfo(userid, info => {
                // const stream = useMediaStore().userMedia.stream ?? useMediaStore().displayMedia.stream;
                const stream = new MediaStream();
                let mediaConnect: MediaConnection;
                if (stream) {
                    console.log("stream：", stream);
                    mediaConnect = usePeer().peer.call(info.payload.peerId, stream, {
                        metadata: {
                            peerId: usePeer().peer.id,
                            user: useAppStore().user,
                            userMedia: useMediaStore().userMedia.stream !== undefined,
                            displayMedia: useMediaStore().displayMedia.stream !== undefined
                        }
                    });
                    mediaConnect.on('close', () => {
                        _mediaConnectMap.delete(info.payload.peerId);
                        useMediaStore().userMedia.stop();
                        useMediaStore().displayMedia.stop();
                        onreject()
                        _callStatus.value = 'Idle';
                        disconnect();
                    })
                    mediaConnect.on('stream', (stream) => {
                        console.log("stream", stream);
                        _currentConnect.value = mediaConnect;
                        _mediaConnectMap.clear();
                        _callStatus.value = 'Active';
                    })
                    mediaConnect.on('error', (error) => {
                        console.log(error);
                    })
                    _mediaConnectMap.set(info.payload.peerId, mediaConnect);
                }
            });
        }
        _callStatus.value = 'Initiating';
    }

    function disconnect() {
        _mediaConnectMap.forEach(call => {
            call.close();
        })
        _currentConnect.value?.close();
        _callStatus.value = 'Idle';
    }


    return {
        init,
        callStatus,
        connect,
        disconnect,
        isBackground,
        setBackground
    }
})