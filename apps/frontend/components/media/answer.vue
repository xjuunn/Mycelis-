<template>
    <modal title="来电" :is-show="isShow" @on-backdrop-click="onBackDropClick">
        <template #content>
            <div class="flex gap-4 p-2 pb-0">
                <div class="avatar w-13 ring-2 ring-success rounded-full overflow-hidden">
                    <img :src="File.getFileUrl(callOption?.metadata.user.avatarUrl)" alt="">
                </div>
                <div>
                    <div v-if="callOption?.metadata.user.displayName">
                        <span class="font-black">{{ callOption?.metadata.user.displayName }}</span>
                        <span class="text-xs ml-1 opacity-70">({{ callOption?.metadata.user.name }})</span>
                    </div>
                    <div v-else>
                        <span class="font-black">{{ callOption?.metadata.user.name }}</span>
                    </div>
                    <div class="flex gap-1 mt-1">
                        <div class="badge badge-accent" v-show="callOption?.metadata.userMedia">视频/语音</div>
                        <div class="badge badge-info" v-show="callOption?.metadata.displayMedia">屏幕共享</div>
                    </div>
                </div>
            </div>
        </template>
        <template #action>
            <div class="join">
                <button class="btn btn-sm btn-ghost join-item" @click="btnReject">挂断</button>
                <button class="btn btn-sm btn-success join-item" @click="btnAnswer">接通</button>
            </div>
        </template>
    </modal>
</template>

<script setup lang="ts">
import * as File from '~/api/file';
import { type MediaConnection } from 'peerjs';
const isShow = ref(false);
let callOption: Ref<MediaConnection | null> = ref(null);
function onBackDropClick() {
    isShow.value = false;
}
onMounted(() => {
    init();
})

function init() {
    usePeer().peer.on('call', async (call) => {
        if (call.metadata.trust) return;
        callOption.value = call;
        isShow.value = true;
        call.on('close', () => {
            isShow.value = false;
        })

    })
}
function btnReject() {
    useCallStore().disconnect();
    isShow.value = false;
}
async function btnAnswer() {
    callOption.value?.close();
    if (callOption.value) {
        useCallStore().setCurrentUserInfo(callOption.value.metadata)
        useCallStore().connectByPeerId(callOption.value.peer, () => { }, true, { trust: true });
    }
    isShow.value = false;
}
</script>