<template>
    <div class="h-full flex flex-col">
        <div class="flex-1 max-h-full flex-col p-8 flex items-center">
            <form @submit.prevent="doSearch" class="join join-horizontal w-full justify-center lg:mt-10 max-w-[500px]">
                <input v-model="searchText" type="text" class="input rounded-l-md focus-within:outline-0 flex-1"
                    placeholder="搜索" />
                <button type="submit" class="btn join-item btn-primary">搜索</button>
            </form>
            <div class="mt-5 max-w-[500px] w-full place-self-center overflow-y-scroll max-h-full p-2 pb-[200px]">
                <div v-for="(item, index) in listData" :key="item.id"
                    class="min-h-16 bg-base-200 rounded-lg flex p-3 gap-2 mt-2 border border-base-content/0 hover:border-base-content/20">
                    <div class="avatar h-10 rounded-full overflow-hidden">
                        <img :src="getFileUrl(item.avatarUrl ?? '')" alt="tx">
                    </div>
                    <div class="h-fit flex flex-1">
                        <div class="flex-1">
                            <div class="font-bold">{{ item.displayName ?? item.name }}</div>
                            <div class="text-sm text-base-content/80">
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="mt-2 mr-1">
                            <button class="btn btn-primary btn-sm" @click="btnAddFriend(item)">添加</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
let searchText = ref('')
import type { Types } from '@mycelis/database';
import { getFileUrl } from '~/api/file';
import * as User from '~/api/user';
import * as Friend from '~/api/friend';
let listData: Ref<Types.User[]> = ref([]);
function doSearch() {
    if (searchText.value.trim().length == 0) return;
    initData();
}
async function initData() {
    let { data } = await User.search(searchText.value);
    listData.value = data.data.list;
}
function btnAddFriend(item: Types.User) {
    Friend.FriendRequest.create(item.id).then(({ data }) => {
        useToast().success("请求成功")
    }).catch(({ msg }) => useToast().error(msg))



}
</script>