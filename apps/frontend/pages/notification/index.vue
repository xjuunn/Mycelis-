<template>
    <!-- <div v-for="(item, index) in listData" :key="item.id">
        <div>{{ item }}</div>
    </div> -->
    <div class="h-full flex flex-col items-center p-2 lg:pt-10">
        <div class="max-w-[500px] w-full">
            <div v-for="(item, index) in listData" :key="item.id"
                class="min-h-16 bg-base-200 rounded-lg flex p-3 gap-2 mt-2 border border-base-content/0 hover:border-base-content/20">
                <div class="avatar h-10 rounded-full overflow-hidden">
                    <img :src="getFileUrl(item.data.sender.avatarUrl ?? '')" alt="tx">
                </div>
                <div class="h-fit flex flex-1">
                    <div class="flex-1">
                        <div class="font-bold">{{ item.data.sender.displayName ?? item.data.sender.name }}</div>
                        <div class="text-sm text-base-content/80">
                            {{ item.data.sender.name }}
                        </div>
                    </div>
                    <div class="mt-2 mr-1">
                        <div class="join">
                            <button class="btn join-item btn-primary btn-sm" @click="btnAccept(item)">接受</button>
                            <button class="btn join-item btn-error btn-sm" @click="btnReject(item)">拒绝</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getFileUrl } from '~/api/file'
import * as Friend from '~/api/friend'
import type { PageRequest } from '@mycelis/types';
import { AppNotification, AppNotificationLevel, AppNotificationOrigin } from '@mycelis/types';
import type { Types } from '@mycelis/database';
let pageInfo: PageRequest = { skip: 0, take: 15 }
let listData: Ref<AppNotification<Types.FriendRequest & { sender: Types.User }>[]> = ref([])
onMounted(() => {
    initList();
})

async function initList() {
    listData.value = [];
    listFriendRequest();
}
async function listFriendRequest() {
    let { data } = await Friend.FriendRequest.listReceived('PENDING', pageInfo)
    data.data.list.forEach(item => {
        listData.value.push({
            id: 'friendRequest' + item.id,
            content: item.sender.displayName + '请求添加为好友',
            data: item,
            icon: '',
            level: AppNotificationLevel.normal,
            origin: AppNotificationOrigin.好友申请,
            timestamp: new Date(item.createAt).getTime() + ''
        })
    })
}

async function btnAccept(item: AppNotification<Types.FriendRequest & { sender: Types.User }>) {
    Friend.FriendRequest.accept(item.data.id).then(({ data }) => {
        useToast().success("添加成功");
        initList();
    }).catch(e => { useToast().error(e.msg) })
}
async function btnReject(item: AppNotification<Types.FriendRequest & { sender: Types.User }>) {
    Friend.FriendRequest.reject(item.data.id).then(({ data }) => {
        useToast().success("已拒绝");
        initList();
    }).catch(e => { useToast().error(e.msg) })


}
</script>