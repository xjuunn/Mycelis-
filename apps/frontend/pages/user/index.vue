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
                    <div class="join">
                        <input v-model="displayName" type="text" class="join-item input focus-within:outline-0 input-sm"
                            placeholder="输入昵称">
                        <button class="btn btn-primary btn-soft join-item btn-sm"
                            @click="btnUpdateDisplayName">修改</button>
                    </div>
                </div>
            </div>
            <div
                class="collapse collapse-arrow mt-2 bg-base-200 rounded-lg border border-base-content/10 hover:border-base-content/20">
                <input type="radio" name="userInfo">
                <div class="collapse-title flex items-center">
                    用户名： {{ useAppStore().user?.name }}
                </div>
                <div class="collapse-content">
                    <div class="join">
                        <input type="text" v-model="name" class="join-item input focus-within:outline-0 input-sm"
                            placeholder="输入用户名">
                        <button class="btn btn-primary btn-soft join-item btn-sm" @click="btnUpdateName">
                            <span v-show="!isBtnUpdateNameLoading">修改</span>
                            <span class="loading loading-sm" v-show="isBtnUpdateNameLoading"></span>
                        </button>
                    </div>
                    <div class="text-xs p-1 flex items-center">
                        <span v-show="isBtnUpdateNameLoading" class="loading loading-xs"></span>
                    </div>
                </div>
            </div>
            <div
                class="collapse collapse-arrow mt-2 bg-base-200 rounded-lg border border-base-content/10 hover:border-base-content/20">
                <input type="radio" name="userInfo">
                <div class="collapse-title flex items-center">
                    修改密码： *******
                </div>
                <div class="collapse-content">
                    <div class="flex flex-col gap-2 w-full p-4">
                        <label class="input focus-within:outline-0 input-sm flex items-center">
                            <span class="label w-32">旧密码</span>
                            <input autocomplete="new-password" v-model="oldpassword" type="password"
                                placeholder="输入旧密码" />
                        </label>
                        <label class="input focus-within:outline-0 input-sm flex items-center">
                            <span class="label w-32">新密码</span>
                            <input autocomplete="off" v-model="newpassword1" type="password" placeholder="输入新密码" />
                        </label>
                        <label class="input focus-within:outline-0 input-sm flex items-center">
                            <span class="label w-32">重复新密码</span>
                            <input autocomplete="off" v-model="newpassword2" type="password" placeholder="输入新密码" />
                        </label>

                    </div>
                    <div class="text-end pr-6">
                        <button class="btn btn-primary btn-soft btn-sm" v-show="!isBtnUpdatePasswordLoading" @click="btnUpdatePassword">修改</button>
                    </div>
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

const displayName = ref(useAppStore().user?.displayName ?? '');
async function btnUpdateDisplayName() {
    const { data } = await User.update({
        displayName: displayName.value
    })
    if (data.code === 200) {
        useAppStore().setUser(data.data);
    } else {
        useToast().error(data.msg);
    }
}

const name = ref(useAppStore().user?.name ?? '');
const isBtnUpdateNameLoading = ref(false);
async function btnUpdateName() {
    if (isBtnUpdateNameLoading.value) return;
    if (name.value === (useAppStore().user?.name ?? '')) {
        useToast().error('请修改用户名');
        return;
    }
    isBtnUpdateNameLoading.value = true;
    User.update({
        name: name.value
    }).then((res) => {
        if (res.data.code === 200) {
            useAppStore().setUser(res.data.data);
            useToast().success('修改成功');
        } else {
            useToast().error(res.data.msg);
        }
        isBtnUpdateNameLoading.value = false;
    }).catch((err) => {
        useToast().error(err.msg);
        isBtnUpdateNameLoading.value = false;
    })

}

const oldpassword = ref('');
const newpassword1 = ref('');
const newpassword2 = ref('');
const isBtnUpdatePasswordLoading = ref(false);
function btnUpdatePassword() {
    if (isBtnUpdatePasswordLoading.value) return;
    if (!oldpassword.value || !newpassword1.value || !newpassword2.value) {
        useToast().error('请填写完整信息');
        return;
    }
    if (newpassword1.value !== newpassword2.value) {
        useToast().error('两次密码不一致');
        return;
    }
    isBtnUpdatePasswordLoading.value = true;
    User.update({
        oldPassword: oldpassword.value,
        newPassword: newpassword1.value
    }).then((res) => {
        if (res.data.code === 200) {
            useToast().success('修改成功');
            oldpassword.value = '';
            newpassword1.value = '';
            newpassword2.value = '';
            console.log(res.data);

        } else {
            useToast().error(res.data.msg);
        }
        isBtnUpdatePasswordLoading.value = false;
    }).catch((err) => {
        isBtnUpdatePasswordLoading.value = false;
        useToast().error(err.msg);
    })

}






</script>