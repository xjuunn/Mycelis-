<template>
    <div class=" flex md:flex-row items-center justify-center p-2 gap-2">
        <video v-if="callOption.video" ref="userVideo" v-motion-slide-left
            class=" flex-1 w-1/2 aspect-video bg-base-300 rounded-lg border-2 border-transparent hover:border-success shadow"></video>
        <video v-if="callOption.screen" ref="displayVideo" v-motion-slide-right
            class=" flex-1 w-1/2 aspect-video bg-base-300 rounded-lg border-2 border-transparent hover:border-success shadow"></video>
    </div>
</template>

<script lang="ts" setup>
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
const { stream: streamDisplay, start: startDisplay, stop: stopDisplay } = useDisplayMedia();
const { stream: streamUser, start: startUser, stop: stopUser } = useUserMedia({
    constraints: {
        audio: false,
        video: true
    }
});


function start() {
    // if (props.callOption.video) {
    //     startUserMedia();
    // } else {
    //     stopUserMedia();
    // }
    // if (props.callOption.screen) {
    //     startDisplayMedia();
    // } else {
    //     stopDisplayMedia();
    // }
}
function startUserMedia() {
    if (props.callOption.video) {
        startUser();
        watchEffect(() => {
            if (userVideoEL.value && streamUser.value) {
                userVideoEL.value.srcObject = streamUser.value;
                userVideoEL.value.play();
            }
        });
    }
}
function startDisplayMedia() {
    if (props.callOption.screen) {
        startDisplay();
        watchEffect(() => {
            if (displayVideoEL.value && streamDisplay.value) {
                displayVideoEL.value.srcObject = streamDisplay.value;
                displayVideoEL.value.play();
            }
        });
    }
}
function stop() {
    stopUserMedia();
    stopDisplayMedia();
}
function stopUserMedia() {
    stopUser();
}
function stopDisplayMedia() {
    stopDisplay();
}

let watchUserMedia: any = null;
let watchDisplayMedia: any = null;

function startWatch() {
    watchUserMedia = watchEffect(() => {
        if (props.callOption.video) {
            startUserMedia();
        } else {
            stopUserMedia();
        }
    });

    watchDisplayMedia = watchEffect(() => {
        if (props.callOption.screen) {
            startDisplayMedia();
        } else {
            stopDisplayMedia();
        }
    });
}

function stopWatch() {
    if (watchUserMedia) {
        watchUserMedia();
        watchUserMedia = null;
    }
    if (watchDisplayMedia) {
        watchDisplayMedia();
        watchDisplayMedia = null;
    }
}

defineExpose({
    start,
    stop,
    startUserMedia,
    startDisplayMedia,
    stopUserMedia,
    stopDisplayMedia,
    startWatch,
    stopWatch
});

</script>