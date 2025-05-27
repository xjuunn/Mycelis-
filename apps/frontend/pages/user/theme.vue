<template>
    <div class="h-full flex flex-col">
        <div class="h-24 p-4 sticky top-0 z-40 bg-base-300">
            <div class="absolute bottom-3 text-lg font-bold">
                <button class="btn btn-ghost btn-square mr-2 sm:hidden" @click="goBack">
                    <Icon name="mingcute:left-line" size="1.6rem"></Icon>
                </button>
                <span>主题外观</span>
            </div>
            <div class="absolute bottom-5 sm:bottom-3 right-5">

            </div>
        </div>
        <div class="p-4 overflow-y-auto flex-1">
            <div class="border border-base-content/10 rounded-lg p-2 hover:border-base-content/20 overflow-hidden">
                <MessageItem type="left" :user="useAppStore().user" :msg="{
                    id: 0,
                    message: 'oi',
                    origin: Enums.MessageOrigin.User,
                    createAt: new Date(),
                    senderId: useAppStore().user?.id ?? 0,
                    status: Enums.MessageStatus.Read,
                    type: Enums.MessageType.Text,
                    extra: '',
                    isPinned: false,
                    readAt: new Date(),
                    receiverId: -1,
                    updateAt: new Date(),
                    replyTo: -1,
                }" v-motion-slide-left></MessageItem>
                <MessageItem type="right" :is-last-item="true" :user="useAppStore().user" :msg="{
                    id: 0,
                    message: 'hello ~',
                    origin: Enums.MessageOrigin.User,
                    createAt: new Date(),
                    senderId: useAppStore().user?.id ?? 0,
                    status: Enums.MessageStatus.Read,
                    type: Enums.MessageType.Text,
                    extra: '',
                    isPinned: false,
                    readAt: new Date(),
                    receiverId: -1,
                    updateAt: new Date(),
                    replyTo: -1,
                }" v-motion-slide-right></MessageItem>
            </div>
            <div class="mt-4">
                <div
                    class="border min-h-15 rounded-lg border-base-content/10 hover:border-base-content/20 flex items-center p-4">
                    <span class="text-sm flex-1">主题色</span>
                    <div class="dropdown  dropdown-bottom dropdown-end">
                        <div tabindex="0" role="button"
                            class="text-sm inline-flex items-center transition active:scale-95">
                            <span v-if="theme == 'system'">系统</span>
                            <span v-else-if="theme == 'light'">亮色</span>
                            <span v-else>深色</span>
                            <Icon name="mingcute:down-line" size="1rem"></Icon>
                        </div>
                        <ul tabindex="0" class="dropdown-content  menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><a @click="setTheme('system')">系统</a></li>
                            <li><a @click="setTheme('light')">亮色</a></li>
                            <li><a @click="setTheme('dark')">深色</a></li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Enums } from '@mycelis/types';

onMounted(async () => {
    const t1 = localStorage.getItem('theme');
    if (t1 == 'dark') theme.value = 'dark';
    else if (t1 == 'light') theme.value = 'light';
    else theme.value = 'system';
})

function goBack() {
    useRouter().back();
}
const theme = ref<'system' | 'dark' | 'light'>();

function setTheme(t: 'system' | 'dark' | 'light') {
    theme.value = t;
    useTheme().setTheme(t);
}

</script>
