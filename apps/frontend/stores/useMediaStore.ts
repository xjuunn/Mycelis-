import { type WatchHandle } from 'vue';
export const useMediaStore = defineStore('media', () => {
    let _userMedia = ref(useUserMedia());
    let _displayMedia = ref(useDisplayMedia());
    const _option = ref({
        audio: false,
        video: false,
        screen: false,
    })
    const userMedia = computed(() => _userMedia.value);
    const displayMedia = computed(() => _displayMedia.value);
    const option = computed(() => _option.value);
    function setOption(audio: boolean, video: boolean, screen: boolean) {
        _option.value.audio = audio;
        _option.value.video = video;
        _option.value.screen = screen;
    }

    function startUserMedia(video: boolean, audio: boolean) {
        _option.value.audio = audio;
        _option.value.video = video;
        _userMedia.value.stop();
        _userMedia.value = useUserMedia({ constraints: { audio, video } })
        _userMedia.value.start();
        let unwatch: WatchHandle;
        return new Promise<MediaStream>((res, rej) => {
            unwatch = watchEffect(() => {
                const stream = _userMedia.value.stream;
                if (stream) {
                    res(stream)
                }
            })
        }).finally(() => { if (unwatch) unwatch() });
    }

    function startDisplayMedia(video: boolean) {
        _option.value.screen = video;
        _displayMedia.value.stop();
        _displayMedia.value = useDisplayMedia({ video })
        _displayMedia.value.start();
        let unwatch: WatchHandle;
        return new Promise<MediaStream>((res, rej) => {
            unwatch = watchEffect(() => { if (_displayMedia.value.stream) res(_displayMedia.value.stream) })
        }).finally(() => { if (unwatch) unwatch() });
    }

    return {
        userMedia,
        displayMedia,
        startUserMedia,
        startDisplayMedia,
        option,
        setOption
    }
})