<template>
    <div data-tauri-drag-region class="h-full p-2 grid items-center justify-center gap-2 overflow-y-auto"
        :class="gridClass">
        <div class="aspect-video" v-for="item in trackList.filter(item => item.kind === 'video')" :key="item.id">
            <MediaItem :track-item="item" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';
const { md, lg, xl, '2xl': xxl } = useBreakpoints(breakpointsTailwind);
const count = computed(() => trackList.value.filter(item => {
    return item.kind === 'video'
}).length);

type TrackItem = {
    id: string,
    track: MediaStreamTrack,
    kind: "video" | "audio" | any,
    origin: "local" | "remote"
}

const trackList: Ref<TrackItem[]> = ref([]);

const gridClass = computed(() => {
    if (md.value) return 'grid-cols-1';
    const totalItems = count.value;
    if (totalItems === 1) return 'grid-cols-1';
    if (totalItems === 2) return 'grid-cols-2';
    if (lg.value) return 'grid-cols-2';
    if (totalItems === 3) return 'grid-cols-2';
    if (totalItems === 4) return 'grid-cols-2';
    return 'grid-cols-4';
});

onMounted(() => {
    const currentConnect = useCallStore().currentConnect;
    if (currentConnect) {
        currentConnect.localStream?.getTracks().forEach(track => addTrack(track, 'local'));
        currentConnect.localStream.onaddtrack = trackEvent => addTrack(trackEvent.track, 'local');
        currentConnect.localStream.onremovetrack = trackEvent => removeTrack(trackEvent.track.id);
    }

})

useCallStore().currentConnect?.on('stream', (stream) => {
    stream.getTracks().forEach(track => addTrack(track, 'remote'));
    stream.onaddtrack = trackEvent => addTrack(trackEvent.track, 'remote');
    stream.onaddtrack = trackEvent => addTrack(trackEvent.track, 'remote');
})

function addTrack(track: MediaStreamTrack, origin: 'local' | 'remote') {
    if (trackList.value.find(item => item.id === track.id)) return;
    if ((track as CanvasCaptureMediaStreamTrack).canvas) return;
    trackList.value.push({ id: track.id, kind: track.kind, origin, track })
}

function removeTrack(id: string) {
    trackList.value.filter(track => track.id !== id);
}


</script>