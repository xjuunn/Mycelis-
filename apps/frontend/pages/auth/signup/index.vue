<template>
    <div class="w-screen h-screen bg-base-300 flex items-center justify-center">
        <div class="bg-base-300 sm:bg-base-100 w-full sm:card sm:w-[80%] max-w-[400px] p-10 sm:rounded-2xl">
            <h2 class="font-bold text-2xl text-center">注 册</h2>
            <div class="mt-2 pt-4 pb-2">
                <div>
                    <button class="btn btn-primary btn-sm btn-soft" @click="btnSelectCover">选择头像</button>
                    <span class="ml-2 text-sm text-base-content/70" :class="{ 'line-clamp-1': fileName.length > 25 }">{{
                        fileName }}</span>
                    <input type="file" @change="onCoverSelected" class="hidden" ref="fileinput">
                </div>
                <div class="input mt-2 focus-within:outline-0">
                    <div class="label w-20 justify-end">&nbsp;&nbsp;用户名</div>
                    <input v-model="name" type="text" placeholder="输入用户名">
                </div>
                <div class="input mt-2 focus-within:outline-0">
                    <div class="label w-20 justify-end">&nbsp;&nbsp;&nbsp;&nbsp;密码</div>
                    <input v-model="password1" type="password" placeholder="输入密码">
                </div>
                <div class="input mt-2 focus-within:outline-0">
                    <div class="label w-20 justify-end">重复密码</div>
                    <input v-model="password2" type="password" placeholder="输入密码">
                </div>
                <div class="text-xs mt-2 flex">
                    <NuxtLink to="/auth/signin" class="hover:link hover:text-primary  opacity-50 hover:opacity-100">
                        已有账号？
                    </NuxtLink>
                    <span class="flex-1 text-end p-1 text-error">
                        {{ msg }}
                    </span>
                </div>
                <button class="btn btn-block mt-4 btn-primary" @click="btnSignup">注 册</button>
            </div>
            <div class="divider hidden">OR</div>
            <div class="grid gap-2 grid-cols-2 hidden">
                <!-- WeChat -->
                <button class="btn btn-sm bg-[#5EBB2B] text-white border-[#4eaa0c]">
                    <svg aria-label="WeChat logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32">
                        <g fill="white">
                            <path
                                d="M11.606,3.068C5.031,3.068,0,7.529,0,12.393s4.344,7.681,4.344,7.681l-.706,2.676c-.093,.353,.284,.644,.602,.464l3.173-1.798c1.403,.447,4.381,.59,4.671,.603-.208-.721-.311-1.432-.311-2.095,0-3.754,3.268-9.04,10.532-9.04,.165,0,.331,.004,.496,.011-.965-4.627-5.769-7.827-11.195-7.827Zm-4.327,7.748c-.797,0-1.442-.646-1.442-1.442s.646-1.442,1.442-1.442,1.442,.646,1.442,1.442-.646,1.442-1.442,1.442Zm8.386,0c-.797,0-1.442-.646-1.442-1.442s.646-1.442,1.442-1.442,1.442,.646,1.442,1.442-.646,1.442-1.442,1.442Z">
                            </path>
                            <path
                                d="M32,19.336c0-4.26-4.998-7.379-9.694-7.379-6.642,0-9.459,4.797-9.459,7.966s2.818,7.966,9.459,7.966c1.469,0,2.762-.211,3.886-.584l2.498,1.585c.197,.125,.447-.052,.394-.279l-.567-2.46c2.36-1.643,3.483-4.234,3.483-6.815Zm-12.73-.81c-.704,0-1.275-.571-1.275-1.275s.571-1.275,1.275-1.275,1.275,.571,1.275,1.275c0,.705-.571,1.275-1.275,1.275Zm6.373,0c-.704,0-1.275-.571-1.275-1.275s.571-1.275,1.275-1.275,1.275,.571,1.275,1.275-.571,1.275-1.275,1.275Z">
                            </path>
                        </g>
                    </svg>
                    微信
                </button>

                <!-- QQ -->
                <button class="btn btn-sm bg-white text-black border-[#4eaa0c]">
                    <svg t="1742648434203" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1461" width="16" height="16">
                        <path
                            d="M511.09761 957.257c-80.159 0-153.737-25.019-201.11-62.386-24.057 6.702-54.831 17.489-74.252 30.864-16.617 11.439-14.546 23.106-11.55 27.816 13.15 20.689 225.583 13.211 286.912 6.767v-3.061z"
                            fill="#FAAD08" p-id="1462"></path>
                        <path
                            d="M496.65061 957.257c80.157 0 153.737-25.019 201.11-62.386 24.057 6.702 54.83 17.489 74.253 30.864 16.616 11.439 14.543 23.106 11.55 27.816-13.15 20.689-225.584 13.211-286.914 6.767v-3.061z"
                            fill="#FAAD08" p-id="1463"></path>
                        <path
                            d="M497.12861 474.524c131.934-0.876 237.669-25.783 273.497-35.34 8.541-2.28 13.11-6.364 13.11-6.364 0.03-1.172 0.542-20.952 0.542-31.155C784.27761 229.833 701.12561 57.173 496.64061 57.162 292.15661 57.173 209.00061 229.832 209.00061 401.665c0 10.203 0.516 29.983 0.547 31.155 0 0 3.717 3.821 10.529 5.67 33.078 8.98 140.803 35.139 276.08 36.034h0.972z"
                            fill="#000000" p-id="1464"></path>
                        <path
                            d="M860.28261 619.782c-8.12-26.086-19.204-56.506-30.427-85.72 0 0-6.456-0.795-9.718 0.148-100.71 29.205-222.773 47.818-315.792 46.695h-0.962C410.88561 582.017 289.65061 563.617 189.27961 534.698 185.44461 533.595 177.87261 534.063 177.87261 534.063 166.64961 563.276 155.56661 593.696 147.44761 619.782 108.72961 744.168 121.27261 795.644 130.82461 796.798c20.496 2.474 79.78-93.637 79.78-93.637 0 97.66 88.324 247.617 290.576 248.996a718.01 718.01 0 0 1 5.367 0C708.80161 950.778 797.12261 800.822 797.12261 703.162c0 0 59.284 96.111 79.783 93.637 9.55-1.154 22.093-52.63-16.623-177.017"
                            fill="#000000" p-id="1465"></path>
                        <path
                            d="M434.38261 316.917c-27.9 1.24-51.745-30.106-53.24-69.956-1.518-39.877 19.858-73.207 47.764-74.454 27.875-1.224 51.703 30.109 53.218 69.974 1.527 39.877-19.853 73.2-47.742 74.436m206.67-69.956c-1.494 39.85-25.34 71.194-53.24 69.956-27.888-1.238-49.269-34.559-47.742-74.435 1.513-39.868 25.341-71.201 53.216-69.974 27.909 1.247 49.285 34.576 47.767 74.453"
                            fill="#FFFFFF" p-id="1466"></path>
                        <path
                            d="M683.94261 368.627c-7.323-17.609-81.062-37.227-172.353-37.227h-0.98c-91.29 0-165.031 19.618-172.352 37.227a6.244 6.244 0 0 0-0.535 2.505c0 1.269 0.393 2.414 1.006 3.386 6.168 9.765 88.054 58.018 171.882 58.018h0.98c83.827 0 165.71-48.25 171.881-58.016a6.352 6.352 0 0 0 1.002-3.395c0-0.897-0.2-1.736-0.531-2.498"
                            fill="#FAAD08" p-id="1467"></path>
                        <path
                            d="M467.63161 256.377c1.26 15.886-7.377 30-19.266 31.542-11.907 1.544-22.569-10.083-23.836-25.978-1.243-15.895 7.381-30.008 19.25-31.538 11.927-1.549 22.607 10.088 23.852 25.974m73.097 7.935c2.533-4.118 19.827-25.77 55.62-17.886 9.401 2.07 13.75 5.116 14.668 6.316 1.355 1.77 1.726 4.29 0.352 7.684-2.722 6.725-8.338 6.542-11.454 5.226-2.01-0.85-26.94-15.889-49.905 6.553-1.579 1.545-4.405 2.074-7.085 0.242-2.678-1.834-3.786-5.553-2.196-8.135"
                            fill="#000000" p-id="1468"></path>
                        <path
                            d="M504.33261 584.495h-0.967c-63.568 0.752-140.646-7.504-215.286-21.92-6.391 36.262-10.25 81.838-6.936 136.196 8.37 137.384 91.62 223.736 220.118 224.996H506.48461c128.498-1.26 211.748-87.612 220.12-224.996 3.314-54.362-0.547-99.938-6.94-136.203-74.654 14.423-151.745 22.684-215.332 21.927"
                            fill="#FFFFFF" p-id="1469"></path>
                        <path
                            d="M323.27461 577.016v137.468s64.957 12.705 130.031 3.91V591.59c-41.225-2.262-85.688-7.304-130.031-14.574"
                            fill="#EB1C26" p-id="1470"></path>
                        <path
                            d="M788.09761 432.536s-121.98 40.387-283.743 41.539h-0.962c-161.497-1.147-283.328-41.401-283.744-41.539l-40.854 106.952c102.186 32.31 228.837 53.135 324.598 51.926l0.96-0.002c95.768 1.216 222.4-19.61 324.6-51.924l-40.855-106.952z"
                            fill="#EB1C26" p-id="1471"></path>
                    </svg>
                    QQ
                </button>
                <!-- Google -->
                <button class="btn btn-sm bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55">
                            </path>
                        </g>
                    </svg>
                    Google
                </button>

                <!-- Microsoft -->
                <button class="btn btn-sm bg-[#2F2F2F] text-white border-black">
                    <svg aria-label="Microsoft logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path d="M96 96H247V247H96" fill="#f24f23"></path>
                        <path d="M265 96V247H416V96" fill="#7eba03"></path>
                        <path d="M96 265H247V416H96" fill="#3ca4ef"></path>
                        <path d="M265 265H416V416H265" fill="#f9ba00"></path>
                    </svg>
                    Microsoft
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import * as User from '~/api/user'
import * as FileUpload from '~/api/file'
let name = ref('');
let password1 = ref('');
let password2 = ref('');
let msg = ref('');
let fileinput: Ref<HTMLInputElement | null> = ref(null);
let coverFile: File | null = null;
let fileName = ref('png、jpg、webp、gif');

async function btnSignup() {
    if (name.value === '') {
        msg.value = "请输入用户名";
        return;
    }
    if (name.value.length < 3) {
        msg.value = "用户名过短";
        return;
    }
    if (name.value.length > 20) {
        msg.value = "用户名过长";
        return;
    }
    if (password1.value === '') {
        msg.value = "请输入密码";
        return;
    }
    if (password1.value.length < 6) {
        msg.value = "密码过短";
        return;
    }
    if (password2.value.length > 50) {
        msg.value = "密码过长";
        return;
    }
    if (!isValidName(name.value)) {
        msg.value = "用户名只能由字母、数字、下划线组成";
        return;
    }
    if (!isValidPassword(password1.value)) {
        msg.value = "密码只能由以下字符组成：​大写字母 A-Z、​小写字母 a-z、​数字 0-9、​特殊字符 !@#$%^&*()_";
        return;
    }
    if (password1.value !== password2.value) {
        msg.value = "两次输入的密码不一致";
        return;
    }
    if (!coverFile) {
        msg.value = "请选择头像";
        return;
    }
    let avatarUrl = await uploadFile();
    let { data } = await User.signUp(name.value, password1.value, avatarUrl);
    if (data.code !== 200) {
        msg.value = data.msg;
        return;
    }
    navigateTo('/auth/signIn')
    // TODO 需要防止用户重复点击
}
async function uploadFile() {
    if (!coverFile) return;
    let { data } = await FileUpload.uploadAvatar(coverFile);
    return data.data

}

function isValidName(str: string): boolean {
    return /^[a-zA-Z0-9_]+$/.test(str);
}

function isValidPassword(password: string): boolean {
    return /^[A-Za-z0-9!@#$%^&*()_]+$/.test(password);
}

function btnSelectCover() {
    fileinput.value?.click()
}

function onCoverSelected(event: Event) {
    let target = event.target as HTMLInputElement;
    if (target && target.files) {
        coverFile = target.files[0];
    }
    if (!coverFile) {
        msg.value = "请选择头像";
        return;
    }
    fileName.value = coverFile.name;
}
</script>
