<template>
    <ClientOnly>
        <div class="h-full flex flex-col relative">
            <div class="navbar border-b border-base-content/10">
                <div class="navbar-start ml-2 font-bold">{{ userData?.displayName ?? userData?.name ?? username }}</div>
            </div>
            <div class="flex-1 overflow-y-hidden">
                <MessageList ref="messageList" :userid="userData?.id ?? -1"></MessageList>
            </div>

            <div class="w-full p-2 flex bg-base-200 items-end">
                <button class="btn btn-ghost" @click.prevent="btnTest">
                    <Icon name="mingcute:mic-fill"></Icon>
                </button>
                <Editor ref="editor" v-model="messageText" v-model:is-keyboard-open="isKeyboardOpen"
                    class="flex-1 max-h-20 overflow-y-auto" :toolbar="false" theme="bubble" @focusin="focusin"
                    @enter="btnSend">
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
import * as User from '~/api/user';
import * as Message from '~/api/message';
import * as Friend from '~/api/friend';
import { Enums, type Model } from '@mycelis/types';
const { username } = useRoute().params;
const messageList = useTemplateRef('messageList');
const editor = useTemplateRef('editor');
const isKeyboardOpen = ref(false);
const messageText = ref('')
const userData = ref<Model.User>()
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
    Message.setAllRead(userData.value.id);
}

async function btnSend() {
    if (editor.value && editor.value?.getText().length <= 1) return;
    nextTick(() => {
        isKeyboardOpen.value = true;
        setTimeout(() => {
            messageList.value?.scrollToBottom(true);
        }, 100);
    })
    let { data } = await Message.send({
        message: messageText.value,
        receiverId: userData.value?.id ?? -1,
        type: Enums.MessageType.Text,
        origin: Enums.MessageOrigin.User
    })
    messageText.value = '';
    messageList.value?.scrollToBottom(true);
    messageList.value?.addMessageItem(data);
}
function btnTest() {
    messageList.value?.scrollToBottom(true);
}
</script>