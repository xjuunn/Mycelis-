<template>
    <div class="w-screen h-screen flex flex-col">
        <div class="h-[calc(100vh-4rem)] min-w-0">
            <button class="btn btn-primary" @click="test">test</button>
            <slot></slot>
        </div>
        <div class="dock bg-base-200 border-t-base-content/10" ref="dock">
            <ClientOnly>
                <div v-for="(item, index) in dockItemList" :key="item.id" class="transition relative top-40"
                    :to="{ path: item.page }"
                    :class="item.id == useDockStore().activeDockId ? 'text-primary' : 'opacity-40'"
                    @click="swichDock(item.id, index)">
                    <Icon :name="item.icon" size="1.2rem"></Icon>
                    <span class="dock-label">{{ item.name }}</span>
                </div>
            </ClientOnly>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { animate, createTimeline, stagger } from 'animejs';
let dock: Ref<HTMLElement | null> = ref(null);
let { dockItemList, activeDockId, setActiveDockId, addEvent } = useDockStore();

onMounted(() => {
    updateDockAnime(0);
    swichDock(dockItemList[0].id, 0);
    addEvent('ADD', onDockAdd)
})
function onDockAdd() {
    setTimeout(() => {

        if (dock.value && dock.value.children) {
            dockItemList.forEach((item, index) => {
                if (item.id == useDockStore().activeDockId) {
                    console.log(index);
                    swichDock(useDockStore().activeDockId, index, false)
                    return;
                }
            })
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

function swichDock(activeId: string, index: number, navigate: boolean = true) {
    if (activeDockId === activeId) return;
    setActiveDockId(activeId)
    updateDockAnime(index);
    if (navigate) navigateTo(dockItemList[index].page)
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
function test() {
    useDockStore().addDockItem('test', '/', 'solar:inbox-in-bold-duotone', 'solar:inbox-in-bold-duotone', 2);

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