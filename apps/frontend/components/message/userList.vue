<template>
    <div @click="btnClickFriendItem(item)" class="min-h-16 flex p-2.5 hover:bg-base-200 transition"
        v-for="(item, index) in listData" :key="item.id">
        <div class="indicator">
            <span v-show="(asReceiver(item) ? item.sender : item.receiver).status === 'ONLINE'"
                class="indicator-item status status-success transform-[translate(-9px,9px)]"></span>
            <div class="avatar w-10 h-10 rounded-full overflow-hidden m-1">
                <img :src="File.getFileUrl((asReceiver(item) ? item.sender.avatarUrl : item.receiver.avatarUrl) ?? '')"
                    alt="tx" />
            </div>
        </div>
        <div class="ml-3 flex-1">
            <div class="text-md flex w-full items-center">
                <div class="font-bold flex-1 line-clamp-1">
                    {{ (asReceiver(item) ? item.sender.displayName : item.receiver.displayName) ??
                        (asReceiver(item) ? item.sender.name : item.receiver.name) }}
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
import { Enums, type Model, type PageRequest } from '@mycelis/types';
import * as File from '~/api/file';
import * as Message from '~/api/message';
import * as Friend from '~/api/friend';
import timeSinceOrDate from '~/utils/time/timeSinceOrDate';
const isloading = ref(true);
const pageInfo = ref<PageRequest>({
    skip: 0,
    take: 50
})
const total = ref(0);
const listData = ref<(Model.Message & { sender: Model.User, receiver: Model.User, unReadnum: number })[]>([])
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
    Friend.Friendship.onFriendStatusChange((status) => {

        listData.value.forEach(item => {
            const imSender = !asReceiver(item);
            const friendId = imSender ? item.receiverId : item.senderId;
            if (status.userId === friendId) {
                if (imSender) {
                    item.receiver.status = status.isOnline ? Enums.UserStatus.ONLINE : Enums.UserStatus.OFFLINE;
                    item.receiver.lastLoginAt = status.time;
                } else {
                    item.sender.status = status.isOnline ? Enums.UserStatus.ONLINE : Enums.UserStatus.OFFLINE;
                    item.sender.lastLoginAt = status.time;
                }
                return;
            }
        })
    })

}
function setMessageItem(msg: Model.Message & { sender: Model.User, receiver: Model.User }) {
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
function btnClickFriendItem(msg: Model.Message & { sender: Model.User, receiver: Model.User, unReadnum: number }) {
    msg.unReadnum = 0;
    if (useAppStore().user?.id == msg.senderId) {
        navigateTo(`/message/${msg.receiver.name}?ui=content`)
    } else {
        navigateTo(`/message/${msg.sender.name}?ui=content`)
    }
}
function asReceiver(msg: Model.Message & { sender: Model.User, receiver: Model.User, unReadnum: number }): boolean {
    return useAppStore().user?.id !== msg.senderId;
}
</script>