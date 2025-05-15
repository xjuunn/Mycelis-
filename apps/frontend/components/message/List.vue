<template>
    <!-- 骨架屏 -->
    <div class="p-2" v-show="isloading">
        <div class="chat chat-start">
            <div class="chat-image avatar ">
                <div class="w-10 rounded-full skeleton"></div>
            </div>
            <div class="chat-bubble skeleton w-32"></div>
        </div>
        <div class="chat chat-start">
            <div class="chat-image avatar ">
                <div class="w-10 rounded-full skeleton"></div>
            </div>
            <div class="chat-bubble skeleton w-52"></div>
        </div>
        <div class="chat chat-end">
            <div class="chat-image avatar ">
                <div class="w-10 rounded-full skeleton"></div>
            </div>
            <div class="chat-bubble skeleton w-9/12 h-32"></div>
        </div>
        <div class="chat chat-end">
            <div class="chat-image avatar ">
                <div class="w-10 rounded-full skeleton"></div>
            </div>
            <div class="chat-bubble skeleton w-8/12"></div>
        </div>
    </div>
    <div class="">
        <MessageItem v-for="(item, index) in listData" :key="item.id" :msg="item" @dbclick="onDbclientItem(item.id)"
            :is-last-item="index === listData.length - 1" @click="onClickItem(item.id)"
            :user="item.senderId === myData?.id ? myData : friendData" :is-selected="item.id === selectedId"
            :type="item.senderId === myData?.id ? 'right' : 'left'"></MessageItem>
        <div ref="bottom" class="h-2 mt-20" id="messagebottom"></div>
    </div>
</template>

<script lang="ts" setup>
import type { Types } from '@mycelis/database';
import type { PageRequest } from '@mycelis/types';
import * as Message from '~/api/message';
import * as User from '~/api/user';
const props = defineProps<{
    userid: number
}>()
const bottom = useTemplateRef('bottom');
const bottomVisibility = useElementVisibility(bottom)
const pageInfo = ref<PageRequest>({ take: 30, skip: 0 })
const listData: Ref<Types.Message[]> = ref([]);
const friendData = ref<Types.User>();
const myData = ref<Types.User>();
const selectedId = ref(-1);
const isloading = ref(true);

watch(() => props.userid, () => {
    initList();
})
onMounted(() => {
    initList();
    initListener();
})
async function initListener() {
    Message.onReceived((msg) => {
        addMessageItem(msg)
    })
}

function addMessageItem(msg: Types.Message) {
    listData.value.push(msg);
    if (bottomVisibility.value) nextTick(scrollToBottom);
}

async function initList() {
    isloading.value = true;
    if (props.userid < 0) return;
    let { data } = await Message.listByFriend({ senderId: props.userid }, pageInfo.value)
    listData.value = data.data.list.reverse();
    let { data: userData } = await User.find(props.userid);
    friendData.value = userData.data;
    let { data: myData1 } = await User.find(useAppStore().user?.id ?? -1);
    myData.value = myData1.data;
    isloading.value = false;
    scrollToBottom(false)
}

const scrollToBottom = (isSmooth: boolean = true) => {
    bottom.value?.scrollIntoView({
        behavior: isSmooth ? 'smooth' : 'auto'
    })
}
defineExpose({
    scrollToBottom, addMessageItem
})

function onDbclientItem(id: number) {
    selectedId.value = id;
}
function onClickItem(id: number) {
    selectedId.value = -1;
}
</script>