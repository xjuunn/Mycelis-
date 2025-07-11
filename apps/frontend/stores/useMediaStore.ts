import { type WatchHandle } from 'vue';
export const useMediaStore = defineStore('media', () => {
    let _userMedia = ref(useUserMedia());
    let _displayMedia = ref(useDisplayMedia());
    const userMedia = computed(() => _userMedia.value);
    const displayMedia = computed(() => _displayMedia.value)

    function startUserMedia(video: boolean, audio: boolean) {
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
        startDisplayMedia
    }
})