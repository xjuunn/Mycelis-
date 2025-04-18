<template>
    <div class="w-screen h-screen flex flex-col overflow-hidden">
        <div class="h-[calc(100vh-4rem)] min-w-0" ref="page">
            <slot></slot>
        </div>
        <div class="dock bg-base-200 border-t-base-content/10" ref="dock">
            <div v-for="(item, index) in dockItemList" :key="item.id" class="transition relative top-40"
                :class="item.id == useDockStore().activeDockId ? 'text-primary' : 'text-base-content/20'"
                @click="swichDock(item.id, index)">
                <Icon :name="item.icon" size="1.2rem"></Icon>
                <span class="dock-label">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { animate, createTimeline, stagger, utils } from 'animejs';
let dock: Ref<HTMLElement | null> = ref(null);
let page = ref();
let { dockItemList, activeDockId, setActiveDockId, addEvent } = useDockStore();
onMounted(() => {
    updateDockAnime(0);
    swichDock(dockItemList[0].id, 0);
    navigateTo('/')
    addEvent('ADD', onDockAdd)
})
function onDockAdd() {
    setTimeout(() => {
        if (dock.value && dock.value.children) {
            // dockItemList.forEach((item, index) => {
            //     if (item.id == useDockStore().activeDockId) {
            //         // swichDock(useDockStore().activeDockId, index)
            //         return;
            //     }
            // })
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
        x: where === 'left' ? '50vw' : '-50vw',
        duration,
        opacity: 0,
        ease: 'linear',
        onComplete: self => {
            utils.set(page.value, {
                x: where === 'left' ? '-50vw' : '50vw',
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
    }, duration + 10);
}

function updateDockAnime(index: number) {
    if (dock.value && dock.value.children[index]) {
        // 100%
        // dock.value.style.setProperty('--dock-indicator-width', `calc( (100% - 16px) / ${dockItemList.value.length})`)
        // dock.value.style.setProperty('--dock-indicator-left', `calc((var(--dock-indicator-width)) * ${index})`)
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

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: all 2s;
    transition-timing-function: linear;
}

.slide-left-enter-from {
    opacity: 0;
    transform: translate(100vw, 0);
}

.slide-left-leave-to {
    opacity: 0;
    transform: translate(-100vw, 0);
}

.slide-right-enter-from {
    opacity: 0;
    transform: translate(-100vw, 0);
}

.slide-right-leave-to {
    opacity: 0;
    transform: translate(100vw, 0);
}
</style>