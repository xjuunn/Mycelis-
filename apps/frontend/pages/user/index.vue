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
        <div class="p-4 text-sm">
            <div
                class="collapse collapse-arrow  mt-1 bg-base-200 rounded-lg border border-base-content/10 hover:border-base-content/20 transform-[height]">
                <input type="radio" name="userInfo" />
                <div class="collapse-title flex items-center">
                    头像：
                    <div class="avatar w-10 h-10 rounded-full overflow-hidden">
                        <img :src="APIFile.getFileUrl(useAppStore().user?.avatarUrl ?? '')">
                    </div>
                </div>
                <div class="collapse-content">
                    <div ref="uploaderBox" @click="onUploaderBoxClick"
                        class="flex items-center justify-center border h-20 border-dashed rounded-lg border-base-content/20"
                        :class="{ 'border-primary': isOverDropZone }">
                        <input type="file" ref="uploader" v-show="false" @change="onUploaderChange">
                        <Icon :class="{
                            'text-primary opacity-75 animate-pulse': isOverDropZone
                        }" name="mingcute:file-upload-fill" size="2.5rem" class="opacity-15"></Icon>
                    </div>
                    <div class="flex mt-3" v-motion-slide-bottom v-if="avatarFile">
                        <div class="avatar w-10 h-10 overflow-hidden rounded-full">
                            <img :src="createURL" alt="">
                        </div>
                        <div class="flex-1 ml-2 ms-0 self-center line-clamp-1">{{ avatarFile.name }}</div>
                        <button class="btn btn-primary btn-sm self-center btn-soft" @click="btnUpdateAvatar">
                            <span v-if="isBtnUpdateAvatarLoading" class="loading loading-sm"></span>
                            <span v-else>修改</span>
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="collapse collapse-arrow mt-2 bg-base-200 rounded-lg border border-base-content/10 hover:border-base-content/20">
                <input type="radio" name="userInfo">
                <div class="collapse-title flex items-center">
                    昵称： {{ useAppStore().user?.displayName }}
                </div>
                <div class="collapse-content">
                    test2
                </div>
            </div>
            <div
                class="collapse collapse-arrow mt-2 bg-base-200 rounded-lg border border-base-content/10 hover:border-base-content/20">
                <input type="radio" name="userInfo">
                <div class="collapse-title flex items-center">
                    用户名： {{ useAppStore().user?.name }}
                </div>
                <div class="collapse-content">
                    test3
                </div>
            </div>
            <div
                class="collapse collapse-arrow mt-2 bg-base-200 rounded-lg border border-base-content/10 hover:border-base-content/20">
                <input type="radio" name="userInfo">
                <div class="collapse-title flex items-center">
                    修改密码： *******
                </div>
                <div class="collapse-content">
                    test4
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as APIFile from '~/api/file';
import * as User from '~/api/user';
const uploader = useTemplateRef('uploader');
const uploaderBox = useTemplateRef('uploaderBox');
const { isOverDropZone } = useDropZone(uploaderBox, {
    onDrop,
    dataTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    multiple: false,
})
function goBack() {
    history.go(-1);
}
onMounted(() => {

})

function onUploaderBoxClick() {
    if (!uploader.value) return;
    uploader.value.click();
}

const avatarFile = ref<File>()
function onUploaderChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        if (target.files[0].type.split('/')[0] !== 'image') {
            useToast().error("只能上传图片文件");
            return;
        }
        avatarFile.value = target.files[0];
    }
}

const createURL = computed(() => {
    if (avatarFile.value)
        return URL.createObjectURL(avatarFile.value)
    else return '';
})

function onDrop(files: File[] | null) {
    if (files && files.length > 0)
        avatarFile.value = files[0];
}
const isBtnUpdateAvatarLoading = ref(false);
async function btnUpdateAvatar() {
    if (isBtnUpdateAvatarLoading.value) return;
    if (!avatarFile.value) {
        useToast().error("请先选择头像文件");
        isBtnUpdateAvatarLoading.value = false;
        return;
    }
    isBtnUpdateAvatarLoading.value = true;
    let { data: uploadData } = await APIFile.uploadAvatar(avatarFile.value);
    let { data: updateAvatarData } = await User.update({
        avatarUrl: uploadData.data
    })
    if (updateAvatarData.code === 200) {
        useAppStore().setUser(updateAvatarData.data);
    } else {
        useToast().error(updateAvatarData.msg);
    }
    avatarFile.value = undefined;
    isBtnUpdateAvatarLoading.value = false;
}
</script>