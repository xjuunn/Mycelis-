<template>
    <div class="h-full">
        <BaseLayoutLR title="通讯录">
            <template #list>
                <div class="p-2">
                    <ul class="menu menu-lg text-xs w-full">
                        <li v-for="item in linkList" :key="item.path" class="opacity-70" :class="{
                            'opacity-100 bg-base-content/10': $route.path === item.path.split('?')[0] && sm
                        }">
                            <NuxtLink :to="item.path" class="text-sm p-3 flex">
                                <Icon :name="item.icon"></Icon>
                                <div class="flex-1">{{ item.name }}</div>
                                <Icon class="opacity-60" name="mingcute:right-line"></Icon>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </template>
            <template #content>
                <NuxtPage></NuxtPage>
            </template>
        </BaseLayoutLR>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';

definePageMeta({ layout: "app-main" });
const { sm } = useBreakpoints(breakpointsTailwind)
interface Link {
    name: string;
    path: string;
    icon: string;
}
const linkList = ref<Link[]>([
    {
        name: "通知",
        icon: "mingcute:notification-fill",
        path: "/contacts?ui=content"
    },
    {
        name: "好友申请",
        icon: "mingcute:user-add-fill",
        path: "/contacts/friend-request?ui=content"
    },
]);
</script>