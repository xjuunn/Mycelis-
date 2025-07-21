<template>
    <div class="h-full overflow-hidden relative" ref="mediaMenuBox">
        <div ref="top" class="absolute top-0 w-full flex p-1 gap-2 items-center">
            <button @click="btnBack" class="link opacity-50 hover:opacity-100 btn-lg inline-flex">
                <Icon name="mingcute:left-line" size="1.8rem"></Icon>
            </button>
            <div class="avatar w-8 overflow-hidden rounded-full">
                <img :src="getFileUrl(userInfo?.avatarUrl ?? '')" alt="avatar">
            </div>
            <span class="text-sm opacity-70 font-bold" v-if="userInfo?.displayName">
                {{ userInfo?.displayName }}
            </span>
            <span v-else>
                {{ userInfo?.name }}
            </span>
        </div>
        <slot></slot>
        <div ref="bottom" class="w-full absolute bottom-2 flex justify-center gap-1">
            <ul class="menu bg-base-200/40 backdrop-blur-lg border-base-content/10 border menu-horizontal rounded-box">
                <li>
                    <a @click="toggleAudio">
                        <Icon :class="{ 'text-success': useMediaStore().option.audio }" name="mingcute:mic-fill"
                            size="1.1rem"></Icon>
                    </a>
                </li>
                <li>
                    <a @click="toggleVideo">
                        <Icon :class="{ 'text-success': useMediaStore().option.video }" name="mingcute:camcorder-fill"
                            size="1.1rem"></Icon>
                    </a>
                </li>
            </ul>
            <ul class="menu bg-base-200/40 backdrop-blur-lg border-base-content/10 border menu-horizontal rounded-box">
                <li>
                    <a @click="toggleScreen">
                        <Icon :class="{ 'text-success': useMediaStore().option.screen }" name="mingcute:computer-fill"
                            size="1.1rem"></Icon>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Model } from '@mycelis/types';
import { getFileUrl } from '~/api/file';
import { animate } from 'animejs';
const isHidden = ref(false);
const topEL = useTemplateRef('top');
const bottomEL = useTemplateRef('bottom');
const menuBoxEL = useTemplateRef('mediaMenuBox');
const emit = defineEmits(['toggleAudio', 'toggleVideo', 'toggleScreen'])
const userInfo = ref<Model.User>()
function btnBack() {
    history.go(-1)
}
onMounted(() => {
    init();
    userInfo.value = useCallStore().currentUserInfo?.user;

})
let timer: any = null;
function init() {
    watch(isHidden, hidden => hidden ? hiddenMenu() : showMenu())
    timer = setTimeout(() => {
        isHidden.value = true;
        clearTimeout(timer);
    }, 5000);
    if (menuBoxEL.value) {
        menuBoxEL.value.addEventListener('mousemove', () => {
            isHidden.value = false;
            clearTimeout(timer);
            timer = setTimeout(() => {
                isHidden.value = true;
                clearTimeout(timer);
            }, 5000);
        })
    }
}

function showMenu() {
    if (bottomEL.value && topEL.value)
        animate([bottomEL.value, topEL.value], {
            duration: 500,
            y: '0px',
            ease: 'inOutQuart',
            onBegin: (anim) => {
                anim.targets.forEach(item => {
                    item.style.display = '';
                })
            }
        })
}
function hiddenMenu() {
    if (bottomEL.value && topEL.value)
        animate([bottomEL.value, topEL.value], {
            duration: 500,
            y: (e: any) => {
                let target = e as HTMLDivElement
                if (target.classList.contains('top-0')) return '-60px'
                return '60px';
            },
            ease: 'inOutQuart',
            onComplete: (anim) => {
                anim.targets.forEach(item => {
                    item.style.display = 'none';
                })
            }
        })
}

function toggleAudio() {
    useMediaStore().option.audio = !useMediaStore().option.audio;
    emit('toggleAudio')
}
async function toggleVideo() {
    // await useCallStore().useVideoMedia()
    useMediaStore().option.screen = false;
    useMediaStore().option.video = !useMediaStore().option.video;
    emit('toggleVideo')

}
function toggleScreen() {
    useMediaStore().option.video = false;
    useMediaStore().option.screen = !useMediaStore().option.screen;
    emit('toggleScreen')
}
</script>