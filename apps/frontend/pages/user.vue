<template>
    <div class="h-full flex justify-center">
        <div class="w-full max-w-[1000px] h-full flex overflow-y-auto sm:pl-5 sm:pr-5">
            <div class="w-full sm:w-60 min-w-0" v-if="sm || !isShowContent" v-motion="listMotion">
                <div class="h-28 bg-cover flex relative w-full">
                    <div class="w-28 sm:w-20 place-content-end">
                        <div
                            class="avatar ring-4 ring-base-300 h-16 w-16 sm:h-14 sm:w-14 ml-7 sm:ml-2 mb-2 overflow-hidden rounded-full">
                            <img :src="File.getFileUrl(useAppStore().user?.avatarUrl ?? '')">
                        </div>
                    </div>
                    <div class="flex-1 place-content-end max-w-full min-w-0 p-2">
                        <div class="pb-1" v-if="useAppStore().user?.displayName">
                            <span class="text-lg font-bold line-clamp-1">{{ useAppStore().user?.displayName }}</span>
                            <span class="text-sm opacity-60 line-clamp-1">{{ useAppStore().user?.name }}</span>
                        </div>
                        <div class="pb-9" v-else>
                            <span class="text-xl font-bold line-clamp-1">{{ useAppStore().user?.name }}</span>
                        </div>
                        <div class="absolute right-4 bottom-0 join sm:hidden">
                            <button @click="btnLogout" class="btn btn-error btn-soft join-item btn-sm">
                                <Icon name="mingcute:exit-fill"></Icon>
                                登出
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-2 p-4 sm:p-0">
                    <div v-for="group in listData" :key="group.groupName" class="mt-4">
                        <span class="font-bold text-sm opacity-50 p-2">{{ group.groupName }}</span>
                        <div
                            class="p-2 bg-base-200/60 sm:bg-inherit rounded-lg text-sm border border-base-content/10 sm:border-0">
                            <div v-for="item in group.list" :key="item.name"
                                @click="() => { navigateTo(item.path); item.onClick && item.onClick() }"
                                class="p-3 hover:bg-base-100 rounded-sm cursor-pointer flex gap-2">
                                <Icon :name="item.icon" class="opacity-50"></Icon>
                                <span class="text-base-content/90 flex-1">{{ item.name }}</span>
                                <span v-if="item.info" class="text-base-content/50 text-sm opacity-70">
                                    {{ typeof item.info === 'function' ? item.info() : item.info }}
                                </span>
                                <Icon name="mingcute:right-line" class="opacity-50 sm:hidden"></Icon>
                            </div>
                        </div>
                    </div>
                    <button @click="btnLogout" class="btn btn-error btn-soft join-item btn-sm ml-4 hidden sm:flex">
                        <Icon name="mingcute:exit-fill"></Icon>
                        登出
                    </button>
                </div>
            </div>
            <div class="flex-1 h-full overflow-y-auto" v-if="sm || isShowContent" v-motion="contentMotion">
                <NuxtPage></NuxtPage>
            </div>
        </div>
    </div>
    <Modal title="登出" :is-show="isShowLogoutModal" @on-backdrop-click="isShowLogoutModal = false">
        <template #content>
            <br>
            <p>是否要登出账号？</p>
        </template>
        <template #action>
            <div class="join">
                <button class="btn  btn-sm join-item" @click="isShowLogoutModal = false">取消</button>
                <button class="btn btn-error btn-sm join-item" @click="logout">登出</button>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
definePageMeta({ layout: "app-main" })
const { sm } = useBreakpoints(breakpointsTailwind)
import { breakpointsTailwind } from '@vueuse/core';
import * as File from '~/api/file';
const isShowLogoutModal = ref(false);
const isShowContent = ref(false);
const contentMotion = ref({
    initial: { x: 100, opacity: 0 },
    enter: { x: 0, opacity: 1, transition: { duration: 0 } },
    delay: 20
})
const listMotion = ref({
    initial: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1, transition: { duration: 0 } },
    delay: 20
})
onMounted(() => {
    listMotion.value.enter.transition.duration = 200
    contentMotion.value.enter.transition.duration = 200
})

type ListItem = {
    name: string,
    path: string,
    icon: string,
    info?: (() => string) | string,
    onClick?: () => void
}
type ListGroup = {
    groupName: string,
    list: ListItem[]
}
const listData = ref<ListGroup[]>([
    {
        groupName: "账户设置",
        list: [
            {
                name: '账户和信息',
                path: '/user?ui=content',
                icon: 'mingcute:user-4-fill',
            },
            {
                name: '设备管理',
                path: '/user/devicesList?ui=content',
                icon: 'mingcute:device-fill',
            },
            {
                name: '连接性',
                path: '/user/connect?ui=content',
                icon: 'mingcute:link-2-fill',
            },
        ]
    }, {
        groupName: '应用设置',
        list: [
            {
                name: '主题外观',
                path: '/user/theme?ui=content',
                icon: 'mingcute:device-fill',
            },
            {
                name: '通知',
                path: '/user',
                icon: 'mingcute:notification-fill',
            },
            {
                name: '开发者设置',
                path: '/user',
                icon: 'mingcute:terminal-box-fill',
            },
        ]
    }, {
        groupName: '其他',
        list: [
            {
                name: '支持我',
                path: '/user',
                icon: 'mingcute:github-2-fill',
                info: '给个Star吧 ~',
                onClick: () => {
                    window.open('https://github.com/xjuunn/Mycelis-', '_blank')
                }
            }
        ]
    }
]);

function btnLogout() {
    isShowLogoutModal.value = true;
}

function logout() {
    isShowLogoutModal.value = false;
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    useAppStore().setUser({
        id: -1, name: '', avatarUrl: '', createAt: new Date(), displayName: '', isActive: false, lastLoginAt: new Date(), passwordHash: '', role: 'USER', status: 'OFFLINE', updateAt: new Date()
    });
    navigateTo('/auth/signin')
}

watch(() => useRoute().query, ({ ui }) => {
    if (ui === 'content') {
        isShowContent.value = true;
    } else {
        isShowContent.value = false;
    }
}, {
    immediate: true
})

</script>