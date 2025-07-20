<template>
    <div class="h-full overflow-hidden" ref="mediaMenuBox">
        <div ref="top" class="absolute top-0 w-full">
            <button class="btn btn-primary btn-sm" @click="test">test</button>
            {{ isHidden }}
        </div>
        <slot></slot>
        <div ref="bottom" class="w-full absolute bottom-2 flex justify-center gap-1">
            <ul class="menu bg-base-200 border-base-content/10 border menu-horizontal rounded-box">
                <li>
                    <a>
                        <Icon name="mingcute:mic-fill" size="1.1rem"></Icon>
                    </a>
                </li>
                <li>
                    <a>
                        <Icon name="mingcute:camcorder-fill" size="1.1rem"></Icon>
                    </a>
                </li>
            </ul>
            <ul class="menu bg-base-200 border-base-content/10 border menu-horizontal rounded-box">
                <li>
                    <a>
                        <Icon name="mingcute:computer-fill" size="1.1rem"></Icon>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { animate } from 'animejs';
const isHidden = ref(false);
const topEL = useTemplateRef('top');
const bottomEL = useTemplateRef('bottom');
const menuBoxEL = useTemplateRef('mediaMenuBox');
function test() {
    isHidden.value = !isHidden.value
}

onMounted(() => {
    init();
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
    if (bottomEL.value)
        animate(bottomEL.value, {
            duration: 500,
            opacity: 1,
            y: '0px',
            ease: 'inOutQuart'
        })
    console.log("显示");


}
function hiddenMenu() {
    if (bottomEL.value)
        animate(bottomEL.value, {
            duration: 500,
            opacity: 0,
            y: '20px',
            ease: 'inOutQuart'
        })
    console.log("隐藏");
}

</script>