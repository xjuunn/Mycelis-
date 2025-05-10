<template>
    <div class="h-full">
        <BaseLayoutLR title="通讯录">
            <template #list>
                <div class="p-2 h-full overflow-y-auto">
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
                    <!-- 好友列表 -->
                    <div class="mt-1 p-3">
                        <div v-for="item in listData" :key="item.id" class="flex rounded-lg p-2 hover:bg-base-200 mt-1"
                            @click="onClickFriendItem(item)">
                            <div class="indicator">
                                <span v-show="item.friend.status === 'ONLINE'"
                                    class="indicator-item status status-success transform-[translate(-4px,4px)]"></span>
                                <div class="w-9 h-9 rounded-full overflow-hidden avatar">
                                    <img :src="File.getFileUrl(item.friend.avatarUrl ?? '')">
                                </div>
                            </div>
                            <div class=" ml-2">
                                <div>
                                    {{ item.friend.displayName ?? item.friend.name }}
                                    <span class="text-xs opacity-60" v-show="item.friend.displayName">({{
                                        item.friend.name }})</span>
                                </div>
                                <div class="text-xs opacity-60">
                                    <span v-if="item.friend.status === 'ONLINE'">[在线]</span>
                                    <span v-else>{{ timeSince(item.friend.lastLoginAt) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
import * as Friend from '~/api/friend';
import * as File from '~/api/file';
import type { PageRequest } from '@mycelis/types';
import type { Types } from '@mycelis/database';
import timeSince from '~/utils/time/timeSince';

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
const isLoading = ref(true);
const listData = ref<(Types.Friendship & { friend: Types.User })[]>([])
const pageInfo = ref<PageRequest>({
    skip: 0, take: 100
})
const listTotal = ref(-1);
const form = ref<Friend.Friendship.ListForm>({

})
onMounted(() => {
    initData();
})
async function initData() {
    isLoading.value = true;
    Friend.Friendship.list(form.value, pageInfo.value).then(({ data }) => {
        listData.value = data.data.list;
        listTotal.value = data.data.total;
    }).catch(e => {
        console.log(e);
    })
    isLoading.value = false;
}

function onClickFriendItem(friendShip: (Types.Friendship & { friend: Types.User })) {


}
</script>