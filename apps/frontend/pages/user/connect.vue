<template>
    <div>
        <div class="h-24 p-4 sticky top-0 z-40 bg-base-300">
            <div class="absolute bottom-3 text-lg font-bold">
                <button class="btn btn-ghost btn-square mr-2 sm:hidden" @click="goBack">
                    <Icon name="mingcute:left-line" size="1.6rem"></Icon>
                </button>
                <span>连接性</span>
            </div>
            <div class="absolute bottom-5 sm:bottom-3 right-5" v-show="isSupported">
                <button v-if="isOnline" class="badge badge-sm badge-success">联网</button>
                <button v-else class="badge badge-sm badge-error">断网</button>
            </div>
        </div>
        <div class="p-4 overflow-y-auto">
            <div
                class="border p-4 rounded-lg border-base-content/10 bg-base-200 hover:border-base-content/20 flex flex-col sm:flex-row">
                <div class="flex items-center gap-2 flex-1">
                    <span v-if="isServerConnected == undefined" class="status"></span>
                    <span v-else-if="isServerConnected" class="status status-success animate-pulse"></span>
                    <span v-else class="status status-error animate-pulse"></span>
                    <span class="text-sm">中心服务器</span>
                    <span class="text-xs opacity-60"> {{ serverDelay }}ms</span>
                </div>
                <div class="mt-1 text-sm opacity-80 inline-flex items-center gap-2" v-show="serverSocketID">
                    Socket: {{ serverSocketID }}
                    <button @click="btnCopySocketId">
                        <label class="swap swap-flip" :class="{ 'swap-active': isShowCopyIcon }">
                            <Icon class="link link-accent swap-on" name="mingcute:copy-2-fill" size="0.9rem"></Icon>
                            <Icon class="link link-accent swap-off" name="mingcute:check-fill" size="0.9rem"></Icon>
                        </label>
                    </button>
                </div>

            </div>


        </div>
    </div>
</template>

<script lang="ts" setup>
import * as APPAPI from '~/api/app';
const { isOnline, isSupported } = useNetwork();
function goBack() {
    useRouter().back();
}
onMounted(() => {
    checkServerConnect();
})
const isServerConnected = ref<boolean>();
const serverDelay = ref(-1);
const serverSocketID = ref('');
const isShowCopyIcon = ref(true)
async function checkServerConnect() {
    const { data } = await APPAPI.checkConnect();
    if (data.data === 'ok') {
        isServerConnected.value = true;
        serverDelay.value = data.delay;
    }
    useSocket()?.socket?.once('connect', () => {
        serverSocketID.value = useSocket()?.socket?.id ?? '';
    })
}
function btnCopySocketId() {
    useClipboard().copy(serverSocketID.value);
    isShowCopyIcon.value = false;
    setTimeout(() => {
        isShowCopyIcon.value = true;
    }, 1000);
}



</script>