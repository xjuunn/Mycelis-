<template>
    <div class="h-full flex flex-col">
        <div class="navbar border-b border-b-base-content/10">

        </div>
        <div class="flex-1 overflow-y-auto flex flex-col items-center">
            <form @submit.prevent="onSubmit" class="join mt-10 w-9/12 lg:w-96 max-w-full flex">
                <input v-model="searchValue" type="search" class="input join-item focus-within:outline-0 flex-1">
                <button class="btn btn-primary join-item">搜索</button>
            </form>
            <div v-show="isLoading" class="m-20">
                <div class="loading"></div>
            </div>
            <div v-show="!isLoading" class="mt-3 p-6 w-10/12 lg:w-8/12 grid xl:grid-cols-2 gap-3">
                <div v-for="item in listData" :key="item.id" class="rounded-lg flex p-3 hover:bg-base-200">
                    <div class="indicator">
                        <span v-show="item.status == 'ONLINE'"
                            class="indicator-item status status-success transform-[translate(-5px,5px)]"></span>
                        <div class="rounded-full w-12 h-12 overflow-hidden avatar">
                            <img :src="File.getFileUrl(item.avatarUrl ?? '')">
                        </div>
                    </div>
                    <div class="ml-2 flex-1">
                        <div class="font-bold">{{ item.displayName ?? item.name }}
                            <span class="text-xs opacity-60" v-show="item.displayName">
                                ({{ item.name }})</span>
                        </div>
                        <div class="text-sm">
                            <span class="text-base-content/60 text-xs" v-if="item.status == 'ONLINE'">[在线]</span>
                            <span v-else class="text-base-content/60 text-xs">{{ lastLogin(item.lastLoginAt) }}</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <button v-show="useAppStore().user?.id !== item.id" class="btn btn-primary btn-sm btn-soft"
                            @click="btnAddFriend(item.id)">加好友</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Types } from '@mycelis/database';
import * as User from '~/api/user';
import * as File from '~/api/file';
import * as Friend from '~/api/friend'
const searchValue = ref('');
const pageInfo = ref({
    skip: 0, take: 15
})
const listData: Ref<Types.User[]> = ref([]);
const isLoading = ref(false);
async function onSubmit() {
    if (searchValue.value.length <= 0) return;
    isLoading.value = true;
    let { data } = await User.search(searchValue.value, pageInfo.value.take, pageInfo.value.skip)
    listData.value = data.data.list;
    isLoading.value = false;
}
const lastLogin = (time: Date | null) => {
    if (time == null)
        return '';
    return timeSince(time)
}

// 计算时间差
function timeSince(date: Date) {
    date = new Date(date)
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "年前";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "个月前";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "天前";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "小时前";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "分钟前";
    return '刚刚';
}

async function btnAddFriend(userId: number) {
    Friend.FriendRequest.create(userId).then(({ data }) => {
        useToast().success(data.msg);
    }).catch((e) => {
        useToast().error(e.msg);
    })
} 
</script>