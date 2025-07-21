<template>
    <div class="relative w-full h-screen">
        <div class="h-full w-full">
            <MediaMenus ref="mediaMenus" @toggle-audio="toggleAudio" @toggle-video="toggleVideo"
                @toggle-screen="toggleScreen">
                <MediaList ref="mediaList"></MediaList>
            </MediaMenus>
        </div>
    </div>
</template>

<script lang="ts" setup>
const mediaMenus = useTemplateRef('mediaMenus');
const mediaList = useTemplateRef('mediaList');
function toggleAudio() {

}
function toggleVideo() {

}
function toggleScreen() {

}



</script>