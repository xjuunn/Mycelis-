<template>
    <div class=" flex md:flex-row items-center justify-center p-2 gap-2">
        <video v-if="callOption.video" ref="userVideo" v-motion-slide-left
            class=" flex-1 w-1/2 aspect-video bg-base-300 rounded-lg border-2 border-transparent hover:border-success shadow"></video>
        <video v-if="callOption.screen" ref="displayVideo" v-motion-slide-right
            class=" flex-1 w-1/2 aspect-video bg-base-300 rounded-lg border-2 border-transparent hover:border-success shadow"></video>
    </div>
</template>

<script lang="ts" setup>
import type { WatchHandle } from 'vue';

const userVideoEL = useTemplateRef('userVideo');
const displayVideoEL = useTemplateRef('displayVideo');
type callOptionType = {
    audio: boolean;
    video: boolean;
    screen: boolean;
}
const props = defineProps<{
    callOption: callOptionType;
}>();

let unwatchUserMedia: WatchHandle | null = null;
let unwatchDisplayMedia: WatchHandle | null = null;
async function start() {
    unwatchUserMedia = watch(() => [props.callOption.audio, props.callOption.video], async () => {
        useMediaStore().userMedia.stop();
        if (!props.callOption.audio && !props.callOption.video) return;
        console.log("启动UserMedia");
        const stream = await useMediaStore().startUserMedia(props.callOption.video, props.callOption.audio);
        if (userVideoEL.value && stream) {
            userVideoEL.value.srcObject = stream;
            userVideoEL.value.play();
        }
    }, { immediate: true })
    unwatchDisplayMedia = watch(() => props.callOption.screen, async () => {
        useMediaStore().displayMedia.stop();
        if (!props.callOption.screen) return;
        const stream = await useMediaStore().startDisplayMedia(props.callOption.screen);
        if (displayVideoEL.value && stream) {
            displayVideoEL.value.srcObject = stream;
            displayVideoEL.value.play();
        }
    }, { immediate: true });
}

function stop() {
    if (unwatchDisplayMedia) unwatchDisplayMedia();
    if (unwatchUserMedia) unwatchUserMedia();
    useMediaStore().userMedia.stop();
    useMediaStore().displayMedia.stop();
}

defineExpose({
    start,
    stop
})

</script>