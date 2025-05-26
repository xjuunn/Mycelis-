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
    <div class="overflow-auto h-full flex flex-col-reverse" ref="messageListRef">
        <div ref="bottom" class="h-2 mt-20" id="messagebottom"></div>
        <MessageItem v-for="(item, index) in listData" :key="item.id" :msg="item" @dbclick="onDbclickItem(item.id)"
            :is-last-item="index === listData.length - 1" @click="onClickItem(item.id)"
            :user="item.senderId === myData?.id ? myData : friendData" :is-selected="item.id === selectedId"
            :type="item.senderId === myData?.id ? 'right' : 'left'"></MessageItem>
        <div class="text-sm text-base-content/50 text-center p-5 mb-10" v-show="!hasMore && listData.length > 0"
            v-motion-slide-visible-bottom>
            没有更多消息了~
        </div>
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
const total = ref(-1);
const listData: Ref<Types.Message[]> = ref([]);
const friendData = ref<Types.User>();
const myData = ref<Types.User>();
const selectedId = ref(-1);
const isloading = ref(true);
const messageListRef = useTemplateRef('messageListRef');
const isLoadingMore = ref(false);
const hasMore = ref(true);
const { reset } = useInfiniteScroll(messageListRef, () => {
    loadNextPage();
}, {
    distance: 10,
    direction: 'top',
    canLoadMore: () => {
        if (!hasMore.value) return false;
        return true;
    },
})

watch(() => props.userid, () => {
    initList();
})
onMounted(() => {
    initList();
    initListener();
})
async function initListener() {
    Message.onReceived((msg) => {
        if (props.userid === msg.senderId) {
            addMessageItem(msg)
            Message.read(props.userid)
        }
    })
    Message.onRead((userId: number) => {
        if (friendData.value?.id !== userId) return;
        listData.value.forEach(item => {
            item.status = 'Read';
        })
    })
}

function addMessageItem(msg: Types.Message) {
    listData.value.unshift(msg);
    if (bottomVisibility.value) nextTick(scrollToBottom);
}

async function initList() {
    isloading.value = true;
    if (props.userid < 0) return;
    let { data } = await Message.listByFriend({ senderId: props.userid }, pageInfo.value)
    listData.value = data.data.list;
    total.value = data.data.total;
    let { data: userData } = await User.find(props.userid);
    friendData.value = userData.data;
    let { data: myData1 } = await User.find(useAppStore().user?.id ?? -1);
    myData.value = myData1.data;
    isloading.value = false;
    scrollToBottom(false)
}

const scrollToBottom = (isSmooth: boolean = true) => {
    nextTick(() => {
        bottom.value?.scrollIntoView({
            behavior: isSmooth ? 'smooth' : 'auto'
        })
    })
}
defineExpose({
    scrollToBottom, addMessageItem
})

function onDbclickItem(id: number) {
    selectedId.value = id;
}
function onClickItem(id: number) {
    selectedId.value = -1;
}

async function loadNextPage() {
    if (isloading.value) return;
    if (props.userid < 0) return;
    if (isLoadingMore.value) return;
    isLoadingMore.value = true;
    pageInfo.value.skip += pageInfo.value.take;
    let { data } = await Message.listByFriend({ senderId: props.userid }, pageInfo.value)
    listData.value.push(...data.data.list);
    total.value = data.data.total;
    if (data.data.list.length < pageInfo.value.take) hasMore.value = false;
    if (total.value <= listData.value.length) hasMore.value = false;
    isLoadingMore.value = false;
}
</script>