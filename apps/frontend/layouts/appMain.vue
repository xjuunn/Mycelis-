<template>
    <div class="h-full w-full flex overflow-hidden">
        <ClientOnly>
            <!-- 大屏 DOCK -->
            <div class="w-15 border-r border-r-base-content/10 flex items-center flex-col" v-if="sm" v-motion-slide-left
                data-tauri-drag-region>
                <div class="m-3 mt-4 opacity-30" data-tauri-drag-region>
                    <Icon name="solar:ghost-bold" size="1.7rem" data-tauri-drag-region></Icon>
                </div>
                <div class="flex flex-col gap-1">
                    <button v-for="(item, index) in dockList" :key="item.name"
                        class="btn btn-ghost flex items-center p-2 cursor-pointer rounded-md hover:bg-base-content/10"
                        :class="activeDockIndex === index ? 'btn-primary btn-soft' : ''"
                        @click="btnSwitchDock(item, index, $event.currentTarget)">
                        <Icon :class="activeDockIndex === index ? 'text-primary' : 'text-base-content/40'"
                            class="transition" :name="activeDockIndex === index ? item.activeIcon : item.defaultIcon"
                            size="1.4rem">
                        </Icon>
                    </button>
                </div>
            </div>
            <!-- 小屏 DOCK -->
            <div class="dock bg-base-200" v-if="!sm && $route.query.ui !== 'content'" v-motion-slide-bottom>
                <button v-for="(item, index) in dockList" :key="item.name"
                    @click="btnSwitchDock(item, index, $event.currentTarget)">
                    <Icon :class="activeDockIndex === index ? 'text-primary' : 'text-base-content/40'"
                        class="transition" :name="activeDockIndex === index ? item.activeIcon : item.defaultIcon"
                        size="1.3rem">
                    </Icon>
                </button>
            </div>
            <div class="sm:h-full transition-[height] flex-1 m-0 flex flex-col" ref="page"
                :class="(!sm && $route.query.ui !== 'content') ? 'h-[calc(100%-4rem)]' : 'h-full'">
                <UtilShowOnDevice :show-on="['isDesktop']" :tauri="true">
                    <TitleBar></TitleBar>
                </UtilShowOnDevice>
                <div class="flex-1 overflow-scroll">
                    <slot></slot>
                </div>
            </div>
        </ClientOnly>
    </div>
</template>
<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';
import { animate, createTimeline } from 'animejs';
const { sm } = useBreakpoints(breakpointsTailwind);
const page = useTemplateRef('page');
const dockList = ref([
    {
        name: "Message",
        description: "消息",
        defaultIcon: "mingcute:message-1-line",
        activeIcon: "mingcute:message-1-fill",
        path: '/'
    },
    {
        name: "Contacts",
        description: "通讯录",
        defaultIcon: "mingcute:contacts-2-line",
        activeIcon: "mingcute:contacts-2-fill",
        path: '/contacts'
    },
    {
        name: "At",
        description: "功能",
        defaultIcon: "mingcute:at-line",
        activeIcon: "mingcute:at-fill",
        path: '/at'
    },
    {
        name: "User",
        description: "我的",
        defaultIcon: "mingcute:user-3-line",
        activeIcon: "mingcute:user-3-fill",
        path: '/user'
    }
])
let activeDockIndex = ref(-1);
function setDock() {
    const route = useRoute();
    for (let index = 0; index < dockList.value.length; index++) {
        const item = dockList.value[index];
        if (item.path === '/') continue;
        if (route.path, item.path, route.path.indexOf(item.path) === 0) {
            activeDockIndex.value = index;
            return;
        }
    }
    activeDockIndex.value = 0;
}
watch(() => useRoute().path, (newValue, oldValue) => {
    setDock();
    // console.log(getDockIndex(newValue));
    // slideAnimation(getDockIndex(newValue) > getDockIndex(oldValue) ? 'rightroleft' : 'lefttoright')

})
function getDockIndex(path: string): number {
    for (let index = 0; index < dockList.value.length; index++) {
        const item = dockList.value[index];
        if (item.path === ('/' + path.split('/')[1])) {
            return index;
        }
    }
    return -1;
}

onMounted(() => {
    setDock();
})
let lastPath = '';
function btnSwitchDock(item: any, index: number, dom: any) {
    if (activeDockIndex.value === index) return;
    activeDockIndex.value = index;
    // navigateTo(item.path);
    slideAnimation(getDockIndex(item.path) < getDockIndex(lastPath) ? 'lefttoright' : 'rightroleft', item.path)
    animate(dom, {
        y: '-2px',
        alternate: true,
        loop: 1,
        duration: 90
    })
    lastPath = item.path;
}

function slideAnimation(type: 'lefttoright' | 'rightroleft', path: string) {
    if (!page.value) return;
    let t1 = createTimeline()
    if (!sm.value) {
        t1.add(page.value, {
            duration: 100,
            opacity: 0,
            x: type === 'lefttoright' ? '30%' : '-30%'

        }).set(page.value, {
            x: type === 'lefttoright' ? '-30%' : '30%',
            onBegin: () => {
                navigateTo(path);
            }
        }).add(page.value, {
            duration: 100,
            opacity: 1,
            x: 0
        }, '+=50')
    } else {
        t1.add(page.value, {
            duration: 120,
            opacity: 0,
            onComplete: () => {
                navigateTo(path)
            }
        }).add(page.value, {
            duration: 120,
            opacity: 1,
        }, '+=50')
    }
}
</script>