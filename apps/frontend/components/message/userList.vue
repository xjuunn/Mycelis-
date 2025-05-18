<template>
    <div @click="btnClickFriendItem(item)" class="min-h-16 flex p-2.5 hover:bg-base-200 transition"
        v-for="(item, index) in listData" :key="item.id">
        <div class="indicator">
            <span v-show="(asSender(item) ? item.sender : item.receiver).status === 'ONLINE'"
                class="indicator-item status status-success transform-[translate(-9px,9px)]"></span>
            <div class="avatar w-10 h-10 rounded-full overflow-hidden m-1">
                <img :src="File.getFileUrl((asSender(item) ? item.sender.avatarUrl : item.receiver.avatarUrl) ?? '')"
                    alt="tx" />
            </div>
        </div>
        <div class="ml-3 flex-1">
            <div class="text-md flex w-full items-center">
                <div class="font-bold flex-1 line-clamp-1">
                    {{ (asSender(item) ? item.sender.displayName : item.receiver.displayName) ??
                        (asSender(item) ? item.sender.name : item.receiver.name) }}
                </div>
                <div class="text-xs opacity-40">{{ timeSinceOrDate(item.createAt) }}</div>
            </div>
            <div class="flex mt-1">
                <div class="flex-1 text-xs opacity-60 line-clamp-1" v-html="item.message"></div>
                <div class="badge badge-xs badge-primary" v-show="Number(item.unReadnum) > 0">{{ item.unReadnum }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Types } from '@mycelis/database';
import type { PageRequest } from '@mycelis/types';
import * as File from '~/api/file';
import * as Message from '~/api/message';
import timeSinceOrDate from '~/utils/time/timeSinceOrDate';
const isloading = ref(true);
const pageInfo = ref<PageRequest>({
    skip: 0,
    take: 50
})
const total = ref(0);
const listData = ref<(Types.Message & { sender: Types.User, receiver: Types.User, unReadnum: number })[]>([])
defineExpose({
    setMessageItem
})
onMounted(() => {
    initList();
    initListener();
})
function initListener() {
    Message.onReceived(msg => setMessageItem(msg))
    Message.onSend(msg => setMessageItem(msg))
}
function setMessageItem(msg: Types.Message & { sender: Types.User, receiver: Types.User }) {
    let num = 0;
    listData.value = listData.value.filter(item => {
        const myId = useAppStore().user?.id ?? -1;
        const friendId = msg.senderId == myId ? msg.receiverId : msg.senderId;
        if (msg.senderId !== myId && (item.senderId === friendId || item.receiverId === friendId)) {
            const { username } = useRoute().params;
            if (item.sender.name === username || item.receiver.name === username) {
                num = 0;
            } else {
                num = item.unReadnum + 1;
            }
        }
        return item.senderId != friendId && item.receiverId !== friendId
    })
    listData.value.unshift({ ...msg, unReadnum: num > 0 ? num : 0 });
}
async function initList() {
    isloading.value = true;
    let { data } = await Message.getFriendList(pageInfo.value)
    listData.value = data.data.list;
    total.value = data.data.total;
    isloading.value = false;
}
function btnClickFriendItem(msg: Types.Message & { sender: Types.User, receiver: Types.User, unReadnum: number }) {
    msg.unReadnum = 0;
    if (useAppStore().user?.id == msg.senderId) {
        navigateTo(`/message/${msg.receiver.name}?ui=content`)
    } else {
        navigateTo(`/message/${msg.sender.name}?ui=content`)
    }
}
function asSender(msg: Types.Message & { sender: Types.User, receiver: Types.User, unReadnum: number }): boolean {
    return useAppStore().user?.id !== msg.senderId;
}
</script>