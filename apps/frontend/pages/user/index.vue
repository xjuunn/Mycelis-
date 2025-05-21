<template>
    <div>
        <div class="h-24 p-4 relative">
            <div class="absolute bottom-3 text-lg font-bold">
                <button class="btn btn-ghost btn-square mr-2 sm:hidden" @click="goBack">
                    <Icon name="mingcute:left-line" size="1.6rem"></Icon>
                </button>
                <span>账户和信息</span>
            </div>
        </div>
        <div class="p-4 ">
            <div
                class="p-4 mt-1 flex place-items-center bg-base-200 rounded-lg border border-base-content/10 hover:border-base-content/20 transition">
                <div class="flex-1">
                    头像：
                    <div class="avatar w-10 h-10 rounded-full overflow-hidden">
                        <img :src="File.getFileUrl(useAppStore().user?.avatarUrl ?? '')">
                    </div>
                </div>
                <div>
                    <button class="btn btn-sm btn-primary btn-soft">修改头像</button>
                </div>
            </div>
            <div
                class="p-4 mt-2 flex place-items-center bg-base-200 rounded-lg border border-base-content/10 hover:border-base-content/20 transition">
                <div class="flex-1">
                    昵称： {{ useAppStore().user?.displayName }}
                </div>
                <div>
                    <button class="btn btn-sm btn-primary btn-soft">修改</button>
                </div>
            </div>
            <div
                class="p-4 mt-2 flex place-items-center bg-base-200 rounded-lg border border-base-content/10 hover:border-base-content/20 transition">
                <div class="flex-1">
                    用户名： {{ useAppStore().user?.name }}
                </div>
                <div>
                    <button class="btn btn-sm btn-primary btn-soft">修改</button>
                </div>
            </div>
            <div
                class="p-4 mt-2 flex place-items-center bg-base-200 rounded-lg border border-base-content/10 hover:border-base-content/20 transition">
                <div class="flex-1">
                    修改密码： *******
                </div>
                <div>
                    <button class="btn btn-sm btn-primary btn-soft">修改</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as File from '~/api/file';
function goBack() {
    history.go(-1);
}

</script>