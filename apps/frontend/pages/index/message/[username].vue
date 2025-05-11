<template>
    <ClientOnly>
        <div class="h-full flex flex-col relative">
            <div class="navbar border-b border-base-content/10">
                <div class="join">
                    <div class="btn join-item btn-primary" @click="isKeyboardOpen = true">打开</div>
                    <div class="btn join-item btn-primary" @click="isKeyboardOpen = false">关闭</div>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto">
                <br>
                <div class="chat chat-start" v-for="item in 40">
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
                <button class="btn btn-ghost ">
                    <Icon name="mingcute:mic-fill"></Icon>
                </button>
                <Editor v-model:is-keyboard-open="isKeyboardOpen" class="flex-1 max-h-20 overflow-y-auto"
                    :toolbar="false" theme="bubble" @focusin="focusin">
                </Editor>
                <button class="btn btn-ghost ">
                    <Icon name="mingcute:add-line"></Icon>
                </button>
            </div>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
const content = ref('你好')
const { username } = useRoute().params;
const isKeyboardOpen = ref(false);
function focusin() {
    setTimeout(() => {
        document.getElementById('appBottom')?.scrollIntoView()
    }, 100)
}
</script>