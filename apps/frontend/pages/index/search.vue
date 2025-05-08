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
                        <div class="font-bold">{{ item.displayName ?? item.name }}</div>
                        <div class="text-sm">
                            <span class="text-base-content/60 text-xs" v-if="item.status == 'ONLINE'">[在线]</span>
                            <span v-else>{{ item.lastLoginAt }}</span>
                            <span v-show="item.displayName">{{ item.name }}</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <button class="btn btn-primary btn-sm btn-soft">加好友</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Types } from '@mycelis/database';
import * as User from '~/api/user';
import * as File from '~/api/file'
const searchValue = ref('');
const pageInfo = ref({
    skip: 0, take: 15
})
const listData: Ref<Types.User[]> = ref([]);
const isLoading = ref(false);
onMounted(() => {
    searchValue.value = '1';
    onSubmit()
})
async function onSubmit() {
    if (searchValue.value.length <= 0) return;
    isLoading.value = true;
    let { data } = await User.search(searchValue.value, pageInfo.value.take, pageInfo.value.skip)
    listData.value = data.data.list;
    isLoading.value = false;
}

</script>