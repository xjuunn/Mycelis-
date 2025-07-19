<template>
    <ClientOnly>
        <div class="h-full flex flex-col relative">
            <div class="navbar min-h-4 h-10 border-b border-base-content/10">
                <div class="navbar-start ml-2 font-bold">
                    <button @click="btnBack" class="btn btn-square btn-ghost mr-2 sm:hidden btn-sm">
                        <Icon name="mingcute:left-line"></Icon>
                    </button>
                    {{ userData?.displayName ?? userData?.name ?? username }}
                </div>
                <div class="navbar-end pr-2 z-10">
                    <span @click="btnShowCallModal('voice')"
                        class="btn btn-sm btn-ghost tooltip tooltip-bottom text-base-content/70 hover:text-base-content/100"
                        data-tip="语音通话">
                        <Icon name="mingcute:phone-fill" size="1.1rem"></Icon>
                    </span>
                    <span @click="btnShowCallModal('video')"
                        class="btn btn-sm btn-ghost tooltip tooltip-bottom text-base-content/70 hover:text-base-content/100"
                        data-tip="视频通话">
                        <Icon name="mingcute:camcorder-fill" size="1.1rem"></Icon>
                    </span>
                    <span @click="btnShowCallModal('screen')"
                        class="btn btn-sm btn-ghost tooltip tooltip-bottom text-base-content/70 hover:text-base-content/100"
                        data-tip="共享屏幕">
                        <Icon name="mingcute:computer-fill" size="1.1rem"></Icon>
                    </span>
                </div>
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
        <Modal title="通话" :is-show="isShowCallModal" @on-backdrop-click="onCallModalBackdropClick"
            @on-close="isShowCallModal = false" class="w-96">
            <template #content>
                <div class="text-center text-base-content/70 text-sm mb-2">
                    <div class="avatar w-16 rounded-full overflow-hidden">
                        <img :src="File.getFileUrl(userData?.avatarUrl ?? '')" />
                    </div>
                    <p class="mt-2 font-bold">{{ userData?.displayName ?? userData?.name ?? username }}</p>
                </div>
                <div class="p-3 pt-4 flex gap-2 items-center justify-center">
                    <!-- <label for="call-option-audio" class="opacity-70 text-sm inline-flex items-center">语音：
                        <input id="call-option-audio" v-model="callOption.audio" type="checkbox"
                            class="toggle toggle-sm">
                    </label> <br> -->
                    <div class="tabs">
                        <label class="tab" :class="{ 'opacity-50': !callOption.audio }"
                            @click="callOption.audio = !callOption.audio">
                            <input type="radio" name="my_tabs_4" />
                            <label class="swap swap-rotate">
                                <input type="checkbox" disabled v-model="callOption.audio" />
                                <Icon name="mingcute:mic-fill" class="swap-on"></Icon>
                                <Icon name="mingcute:mic-off-fill" class="swap-off"></Icon>
                            </label> &nbsp;

                            <span v-motion-slide-bottom v-if="callOption.audio">语</span>
                            <span v-motion-slide-top v-else>静</span>音
                        </label>

                        <label class="tab" :class="{ 'opacity-50': !callOption.video }" @click="checkVideo">
                            <input type="radio" name="my_tabs_4" />
                            <label class="swap swap-rotate">
                                <input type="checkbox" disabled v-model="callOption.video" />
                                <Icon name="mingcute:camera-2-fill" class="swap-on"></Icon>
                                <Icon name="mingcute:camera-2-off-fill" class="swap-off"></Icon>
                            </label> &nbsp;
                            视频
                        </label>

                        <label class="tab" :class="{ 'opacity-50': !callOption.screen }" @click="checkScreen">
                            <input type="radio" name="my_tabs_4" />
                            <label class="swap swap-rotate">
                                <input type="checkbox" disabled v-model="callOption.screen" />
                                <Icon name="material-symbols:computer" class="swap-on"></Icon>
                                <Icon name="material-symbols:computer-cancel" class="swap-off"></Icon>
                            </label>&nbsp;
                            屏幕
                        </label>
                    </div>
                </div>
                <MediaPreview v-show="isShowCallModal" ref="mediaPreview" :call-option="callOption"></MediaPreview>
            </template>
            <template #action>
                <div class="join">
                    <button class="btn btn-sm btn-ghost join-item" @click="btnCancelCallModal">
                        取消
                    </button>
                    <button class="btn btn-sm btn-primary join-item" v-motion-slide-right
                        v-if="useCallStore().callStatus == 'Idle'" @click="btnDoCall">呼叫</button>
                    <button v-else v-motion-slide-right class="btn btn-sm btn-success join-item">呼叫中
                        <span class="loading loading-ring loading-sm"></span>
                    </button>
                </div>
            </template>

        </Modal>
    </ClientOnly>
</template>

<script lang="ts" setup>
import * as User from '~/api/user';
import * as Message from '~/api/message';
import * as Friend from '~/api/friend';
import * as File from '~/api/file';
import { Enums, type Model } from '@mycelis/types';
const { username } = useRoute().params;
const messageList = useTemplateRef('messageList');
const editor = useTemplateRef('editor');
const isKeyboardOpen = ref(false);
const messageText = ref('')
const userData = ref<Model.User>()
const isFriend = ref<boolean>();
const isShowCallModal = ref(false);
const callOption = ref({
    audio: true,
    video: false,
    screen: false,
})
const mediaPreview = useTemplateRef('mediaPreview');
function btnBack() {
    history.back();
}

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

function checkVideo() {
    callOption.value.video = !callOption.value.video;
    callOption.value.screen = false;
}

function checkScreen() {
    callOption.value.screen = !callOption.value.screen;
    callOption.value.video = false;
}

// 发起通话按钮
async function btnShowCallModal(type: 'voice' | 'video' | 'screen') {
    if (!userData.value) return;
    isShowCallModal.value = true;
    if (type === 'voice') {
        callOption.value.audio = true;
        callOption.value.video = false;
        callOption.value.screen = false;
    } else if (type === 'video') {
        callOption.value.audio = true;
        callOption.value.video = true;
        callOption.value.screen = false;
    } else if (type === 'screen') {
        callOption.value.audio = false;
        callOption.value.video = false;
        callOption.value.screen = true;
    }
    mediaPreview.value?.start();

}
// 点击通话Modal背景，如果未发起通话，则关闭Modal，如果已发起通话，则转移到后台
function onCallModalBackdropClick() {
    btnCancelCallModal();
    if (useCallStore().callStatus === 'Active') {
        useCallStore().setBackground(true);
    }
}
function btnCancelCallModal() {
    isShowCallModal.value = false;
    useCallStore().disconnect();
    mediaPreview.value?.stop();
}
function btnDoCall() {
    useCallStore().connectByUser(userData.value?.id ?? -1, () => {
        isShowCallModal.value = false;
    });
}
</script>