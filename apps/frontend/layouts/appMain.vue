<template>
    <div class="h-full w-full flex overflow-hidden">
        <!-- 大屏DOCK -->
        <div class="">
            test
        </div>
        <div class="h-[calc(100%-4rem)] sm:h-full transition-[height] flex-1 overflow-y-auto">
            <slot></slot>
        </div>
        <!-- DOCK -->
        <ClientOnly>
            <div class="dock" v-if="!sm" v-motion-slide-bottom>
                <button v-for="(item, index) in dockList" :key="item.name"
                    @click="btnSwitchDock(item, index, $event.currentTarget)">
                    <Icon :class="activeDockIndex === index ? 'text-primary' : 'text-base-content/40'"
                        class="transition" :name="activeDockIndex === index ? item.activeIcon : item.defaultIcon"
                        size="1.3rem">
                    </Icon>
                </button>
            </div>
        </ClientOnly>
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