<template>
    <ClientOnly>
        <div class="h-full flex flex-col relative">
            <div class="navbar border-b border-base-content/10">
                <div class="navbar-start ml-2 font-bold">{{ username }}</div>
            </div>
            <div class="flex-1 overflow-y-auto">
                <MessageList></MessageList>
            </div>

            <div class="absolute bottom-0 left-0 w-full p-2 flex bg-base-200 items-end">
                <button class="btn btn-ghost" @click.prevent="btnTest">
                    <Icon name="mingcute:mic-fill"></Icon>
                </button>
                <Editor v-model="messageText" v-model:is-keyboard-open="isKeyboardOpen"
                    class="flex-1 max-h-20 overflow-y-auto" :toolbar="false" theme="bubble" @focusin="focusin">
                </Editor>
                <button class="btn btn-ghost" @click="btnSend">
                    <Icon name="mingcute:send-fill"></Icon>
                </button>
                <!-- <Icon name="mingcute:add-line"></Icon> -->
            </div>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
import type { Types } from '@mycelis/database';
import * as User from '~/api/user';
import * as Message from '~/api/message';
import * as Friend from '~/api/friend';
const { username } = useRoute().params;
const isKeyboardOpen = ref(false);
const messageText = ref('')
const userData = ref<Types.User>()
const isFriend = ref<boolean>();

function focusin() {
    setTimeout(() => {
        document.getElementById('appBottom')?.scrollIntoView()
    }, 100)
}
onMounted(() => {
    initData();
})
async function initData() {
    if (!username) return;
    let { data } = await User.findByName(username + '');
    userData.value = data.data;
    let { data: data2 } = await Friend.Friendship.list({ friendId: data.data.id }, { take: 0, skip: 0 })
    isFriend.value = data2.data.total > 0;
}

async function btnSend() {
    nextTick(() => {
        isKeyboardOpen.value = true;
    })
    console.log(messageText.value);
    let { data } = await Message.send({
        message: messageText.value,
        receiverId: userData.value?.id ?? -1,
        type: 'Text',
        origin: 'User'
    })
    messageText.value = '';
    console.log(data);
}
function btnTest() {

}
</script>