import { getUserInfo } from '~/api/message/tempMessage';
export const useCallStore = defineStore("call", () => {
    // 定义通话状态
    const _callStatus = ref<'Idle' | 'Initiating' | 'Active'>('Idle');
    // 是否在后台运行
    const _isBackground = ref<boolean>(false);

    const callStatus = computed(() => _callStatus.value);
    const isBackground = computed(() => _isBackground.value);

    function setBackground(isBackground: boolean) {
        _isBackground.value = isBackground;
    }

    function init() {
        usePeer().peer.on('call', (call) => {
            console.log("收到来电：", call);
        })
    }

    function connect(userid: number, options: { audio?: boolean; video?: boolean; screen?: boolean, deviceAudio?: boolean } = {}) {
        console.log(options);

        const { start: userMediaStart, stop: userMediaStop, stream: userMediaStream } = useUserMedia({
            constraints: {
                audio: options.audio ?? false,
                video: options.video ?? false,
            }
        })
        const { start: displayMediaStart, stop: displayMediaStop, stream: displayMediaStream } = useDisplayMedia({
            audio: options.deviceAudio ?? false,
            video: options.screen ?? false,
        });

        if (import.meta.client) {
            getUserInfo(userid, info => {
                displayMediaStart();
                if (displayMediaStream.value) {
                    console.log("123");
                    usePeer().peer.call(info.payload.peerId, displayMediaStream.value);
                    console.log("呼叫：", info.payload.peerId);

                }
            });
        }

        _callStatus.value = 'Initiating';
    }

    function disconnect() {
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

