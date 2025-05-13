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
    <div class="p-2" >
        <MessageItem v-for="item in listData" :key="item.id" :msg="item"
            :user="item.senderId === myData?.id ? myData : friendData"
            :type="item.senderId === myData?.id ? 'right' : 'left'"></MessageItem>
        <div ref="bottom" id="messagebottom"></div>
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
const pageInfo = ref<PageRequest>({ take: 30, skip: 0 })
const listData: Ref<Types.Message[]> = ref([]);
const friendData = ref<Types.User>();
const myData = ref<Types.User>();
const isloading = ref(true);
watch(() => props.userid, () => {
    initList();
})
onMounted(() => {
    initList();

})

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
    console.log("滚动到底部", isSmooth);

    bottom.value?.scrollIntoView({
        behavior: isSmooth ? 'smooth' : 'auto'
    })
}
defineExpose({
    scrollToBottom
})

</script>