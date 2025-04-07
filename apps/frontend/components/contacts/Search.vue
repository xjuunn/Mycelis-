<template>
    <div class="h-full flex flex-col items-center overflow-y-scroll">
        <div class="join w-full">
            <input v-model="searchStr" type="text" class="input input-sm focus-within:outline-none" placeholder="搜索">
            <button class="btn btn-primary btn-sm" @click="btnSearch">搜索</button>
        </div>
        <div v-for="(item, index) in userList" :key="item.id"
            class="w-full mt-4 flex gap-1 p-3 hover:bg-base-200 border border-base-content/0 hover:border-base-content/10 rounded-lg">
            <div class="avatar border w-10 h-10 rounded-full overflow-hidden">
                <img :src="getFileUrl(item.avatarUrl ?? '')" alt="avatar">
            </div>
            <div class="flex-1 min-w-0">
                <div class="line-clamp-1 font-bold">
                    <div class="status ml-1"
                        :class="{ 'status-accent': item.status == 'ONLINE', 'status-neutral': item.status == 'OFFLINE' }">
                    </div>
                    {{ item.displayName ?? item.name }} <span class="text-sm opacity-50" v-show="item.displayName">({{
                        item.name }})</span>
                </div>
                <div class="flex gap-1 ml-1">
                    <div class="flex-1 place-self-end text-xs opacity-60"> </div>
                    <button class="btn btn-primary btn-xs">申请好友</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Types } from '@mycelis/database';
import { getFileUrl } from '~/api/file/index'
import { search, findByName } from '~/api/user'
let searchStr = ref('');
let take = ref(15);
let skip = ref(0);
let userList: Ref<Types.User[]> = ref([]);

async function btnSearch() {
    if (searchStr.value === '') return;
    searchStr.value = searchStr.value.trim();
    let { data } = await search(searchStr.value, take.value, skip.value)
    userList.value = data.data.list;
    let { data: currentUserdata } = await findByName(searchStr.value)
    if (currentUserdata.data) {
        userList.value = userList.value.filter(item => {
            return item.name !== currentUserdata.data.name
        })
        userList.value.unshift(currentUserdata.data)
    }
}
</script>