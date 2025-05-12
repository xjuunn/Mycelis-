<template>
    <ClientOnly>
        <div class="h-full flex flex-col relative">
            <div class="navbar border-b border-base-content/10">
                <div class="navbar-start ml-2 font-bold">{{ username }}</div>
            </div>
            <div class="flex-1 overflow-y-auto">
                <br>
                <div class="chat chat-start">
                    <div class="chat-bubble bg-base-100">
                        It's over Anakin,
                        <br />
                        I have the high ground.
                    </div>
                </div>
                <div class="chat chat-end">
                    <div class="chat-bubble bg-base-100">You underestimate my power!</div>
                </div>
                <br>
                <br>
                <br>
                <br>
            </div>

            <div class="absolute bottom-0 left-0 w-full p-2 flex bg-base-200 items-end">
                <button class="btn btn-ghost">
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
const { username } = useRoute().params;
const isKeyboardOpen = ref(false);
const messageText = ref('')
const userData = ref<Types.User>()

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
}

async function btnSend() {
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
</script>