<template>
    <div class="h-full w-full flex overflow-hidden">
        <ClientOnly>
            <!-- 大屏 DOCK -->
            <div class="w-15 border-r border-r-base-content/10 flex items-center flex-col" v-if="sm"
                v-motion-slide-left>
                <div class="m-3 mt-4 opacity-30">
                    <Icon name="solar:ghost-bold" size="1.7rem"></Icon>
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
            <div class="dock bg-base-200" v-if="!sm" v-motion-slide-bottom>
                <button v-for="(item, index) in dockList" :key="item.name"
                    @click="btnSwitchDock(item, index, $event.currentTarget)">
                    <Icon :class="activeDockIndex === index ? 'text-primary' : 'text-base-content/40'"
                        class="transition" :name="activeDockIndex === index ? item.activeIcon : item.defaultIcon"
                        size="1.3rem">
                    </Icon>
                </button>
            </div>
        </ClientOnly>

        <div class="h-[calc(100%-4rem)] sm:h-full transition-[height] flex-1 m-0">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';
import { animate } from 'animejs';
const { sm } = useBreakpoints(breakpointsTailwind)
const dockList = ref([
    {
        name: "Message",
        description: "消息",
        defaultIcon: "mingcute:message-1-line",
        activeIcon: "mingcute:message-1-fill",
        path: '/'
    },
    {
        name: "At",
        description: "功能",
        defaultIcon: "mingcute:at-line",
        activeIcon: "mingcute:at-fill",
        path: '/at'
    },
    {
        name: "Notification",
        description: "通知",
        defaultIcon: "mingcute:notification-line",
        activeIcon: "mingcute:notification-fill",
        path: '/notification'
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
onMounted(() => {
    const route = useRoute();
    dockList.value.forEach((item, index) => {
        if (item.path === route.path) {
            activeDockIndex.value = index;
            return;
        }
    })
})
function btnSwitchDock(item: any, index: number, dom: any) {
    if (activeDockIndex.value === index) return;
    activeDockIndex.value = index;
    navigateTo(item.path);
    animate(dom, {
        y: '-2px',
        alternate: true,
        loop: 1,
        duration: 90
    })
}
</script>