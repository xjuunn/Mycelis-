<template>
    <div class="h-full border">
        <video ref="video" class="w-full h-full"></video>
    </div>
</template>
<script lang="ts" setup>
const { stream, start, stop } = useDisplayMedia();
const videoEL = useTemplateRef('video');
onMounted(() => {
    // start();
    // watchEffect(() => {
    //     if (videoEL.value && stream.value) {
    //         videoEL.value.srcObject = stream.value;
    //         videoEL.value.play();
    //     }
    // });

});

</script>