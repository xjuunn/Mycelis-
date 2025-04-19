<template>
    <div class="w-screen h-screen flex overflow-hidden" :class="isSm ? 'flex-row' : 'flex-col'">
        <div ref="page" :class="isSm ? 'order-1 flex-1' : 'h-[calc(100vh-4rem)] min-w-0'">
            <slot></slot>
        </div>
        <div :class="{ 'bg-base-200 flex flex-col items-center gap-2 pt-3 border-r border-r-base-content/10': isSm }">
            <Icon v-show="isSm" name="solar:ghost-bold" class="text-base-content/10" size="1.9rem"></Icon>
            <div v-show="isSm" class="border-t border-base-content/10 w-3/4 mt-1"></div>
            <ul v-show="isSm !== null" class="bg-base-200 border-t-base-content/10" ref="dock"
                :class="isSm ? 'flex-col w-fit h-fit gap-1 rounded-lg menu pl-2.5 pr-2.5' : 'dock'">
                <li v-for="(item, index) in dockItemList" :key="item.id" class="transition relative" :class="{
                    'text-primary': item.id == useDockStore().activeDockId,
                    'text-base-content/20': item.id != useDockStore().activeDockId,
                    'top-40': !isSm,
                    'right-40 p-2 rounded-md': isSm,
                    'bg-base-300 shadow': isSm && item.id == useDockStore().activeDockId
                }" @click="swichDock(item.id, index)">
                    <Icon :name="item.icon" :size="isSm ? '1.4rem' : '1.2rem'"></Icon>
                    <span v-show="!isSm" class="dock-label">{{ item.name }}</span>
                </li>
            </ul>
            <div v-show="isSm" class="flex-1">

            </div>
            <div class="mb-3">

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';
import { animate, createTimeline, stagger, utils } from 'animejs';
let dock: Ref<HTMLElement | null> = ref(null);
let page = ref();
let { dockItemList, setActiveDockId, addEvent } = useDockStore();
let points = useBreakpoints(breakpointsTailwind);
let isSm: Ref<null | boolean> = ref(null);
watch(points.sm, () => {
    isSm.value = points.sm.value;
})

onMounted(() => {
    isSm.value = points.sm.value;
    updateDockAnime(0);
    swichDock(dockItemList[0].id, 0);
    navigateTo('/')
    addEvent('ADD', onDockAdd)
})
function onDockAdd() {
    setTimeout(() => {
        if (dock.value && dock.value.children) {
            animate(Array.from(dock.value.children), {
                duration: 300,
                top: '0px',
                delay: stagger(40)
            });

        }
    }, 0);
}

nextTick(() => {
    nextTick(() => {
        if (dock.value && dock.value.children) {
            animate(Array.from(dock.value.children), {
                duration: 300,
                top: '0px',
                right: '0px',
                delay: stagger(40)
            })
        }
    })
})
let animeing = false;
async function swichDock(activeId: string, index: number) {
    if (useDockStore().activeDockId === activeId) return;
    if (animeing) return;
    let where: 'left' | 'right' = useDockStore().activeDockIndex > index ? 'left' : 'right';
    updateDockAnime(index);
    let duration = 100;
    animeing = true;
    setActiveDockId(activeId)
    animate(page.value, {
        x: isSm.value ? 0 : where === 'left' ? '50vw' : '-50vw',
        duration,
        opacity: 0,
        ease: 'linear',
        onComplete: self => {
            utils.set(page.value, {
                x: isSm.value ? 0 : where === 'left' ? '-50vw' : '50vw',
                opacity: 0
            })
            navigateTo(dockItemList[index].page)
        }
    })
    setTimeout(() => {
        animate(page.value, {
            x: '0vw',
            duration,
            opacity: 1,
            ease: 'linear',
            onComplete: self => {
                animeing = false;
            }
        })
    }, duration + 20);
}

function updateDockAnime(index: number) {
    if (dock.value && dock.value.children[index]) {
        dock.value.style.setProperty('--dock-indicator-width', `calc(0.5 * (100% - 16px) / ${dockItemList.length})`)
        dock.value.style.setProperty('--dock-indicator-left', `calc(2 * (var(--dock-indicator-width)) * ${index + 0.25})`)
        let t1 = createTimeline();
        let item = dock.value.children[index];
        t1.add(item, {
            duration: 100,
            y: '-10px',
            ease: 'inOutQuart',
        }).add(item, {
            duration: 150,
            y: '0px',
            ease: 'inOutQuart'
        }, '+=20')
    }
}
</script>

<style>
.dock {
    --dock-indicator-width: calc(0px);
    --dock-indicator-left: 200%;
}

.dock::after {
    content: "";
    height: 3px;
    width: var(--dock-indicator-width);
    position: absolute;
    bottom: 1px;
    left: var(--dock-indicator-left);
    background-color: var(--color-primary);
    margin-left: 8px;
    transition: 0.2s;
    transition-timing-function: ease-out;
    border-radius: 3px;
}
</style>