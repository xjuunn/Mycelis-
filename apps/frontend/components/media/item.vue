<template>
    <div class="h-full rounded-md overflow-hidden">
        <video ref="video" class="w-full h-full"></video>
    </div>
</template>
<script lang="ts" setup>
const videoEL = useTemplateRef('video');

type TrackItem = {
    id: string,
    track: MediaStreamTrack,
    kind: "video" | "audio" | any,
    origin: "local" | "remote"
}

const props = defineProps<{
    trackItem: TrackItem
}>()

onMounted(() => {
    if (videoEL.value) {
        const stream = new MediaStream();
        stream.addTrack(props.trackItem.track);
        videoEL.value.srcObject = stream;
        videoEL.value.play();
    }

});


</script>