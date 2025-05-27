<template>
    <div class="relative">
        <div class="h-24 p-4 sticky top-0 z-40 bg-base-300">
            <div class="absolute bottom-3 text-lg font-bold">
                <button class="btn btn-ghost btn-square mr-2 sm:hidden" @click="goBack">
                    <Icon name="mingcute:left-line" size="1.6rem"></Icon>
                </button>
                <span>设备管理</span>
            </div>
            <div class="absolute bottom-5 sm:bottom-3 right-3">
                <button class="btn btn-soft btn-primary btn-sm" @click="btnUpdateCurrentDeviceName">修改当前设备名</button>
            </div>
        </div>
        <div class="p-4">
            <div class="border flex sm:items-center flex-col sm:flex-row p-4 mt-2 rounded-lg border-base-content/10 bg-base-200 hover:border-base-content/20"
                v-for="item in listData" :key="item.id">
                <div class="flex-1">
                    <span class="text-md font-bold line-clamp-1">
                        设备名：{{ item.name }}
                    </span>
                    <div class="text-sm mt-1">
                        系统：{{ item.os }}
                        <span class="text-sm" v-show="item.name == currentDeviceName">(当前设备) </span>
                        <span class="text-xs opacity-50 scale-50" v-show="item.isOnline">[在线]</span>
                        <span class="text-xs mt-1 opacity-50 hidden sm:inline">
                            上次登录：{{ timeSinceOrDate(item.connectedAt ?? '') }}
                        </span>
                    </div>

                </div>
                <div class="flex items-center justify-between">
                    <span class="text-xs mt-1 opacity-50 sm:hidden">
                        上次登录：{{ timeSinceOrDate(item.connectedAt ?? '') }}
                    </span>
                    <button v-show="item.name !== currentDeviceName" class="join-item btn btn-error btn-soft btn-sm"
                        @click="btnDeleteItem(item)">
                        <Icon name="mingcute:delete-2-line" size="0.9rem"></Icon>
                        删除
                    </button>
                </div>
            </div>
        </div>
    </div>
    <Modal title="修改设备名" :is-show="isShowUpdateNameModal" @on-backdrop-click="isShowUpdateNameModal = false">
        <template #content>
            <div class="flex items-center justify-center p-4 mt-4">
                <label class="input focus-within:outline-0">
                    <span class="label">新设备名</span>
                    <input v-model="newDeviceName" type="text">
                </label>
            </div>
        </template>
        <template #action>
            <div class="join">
                <button class="btn btn-sm" @click="isShowUpdateNameModal = false">取消</button>
                <button class="btn btn-sm btn-soft btn-primary" @click="btnUpdate">确定</button>
            </div>
        </template>
    </Modal>
    <Modal title="删除设备" :is-show="isShowDeleteModal" @on-backdrop-click="isShowDeleteModal = false">
        <template #content>
            <div class="mt-4 p-2">
                <p>确认要删除 <span class="text-error">{{ delDeviceName }}</span> 吗？</p>
            </div>
        </template>
        <template #action>
            <div class="join">
                <button class="btn btn-sm" @click="isShowDeleteModal = false">取消</button>
                <button class="btn btn-sm btn-soft btn-error" @click="btnDoDel">删除</button>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import type { Model } from '@mycelis/types';
import * as User from '~/api/user'
import timeSinceOrDate from '~/utils/time/timeSinceOrDate';

const listData = ref<Model.UserDevice[]>([])
function goBack() {
    useRouter().back();
}
const pageInfo = ref({
    skip: 0,
    take: 15
})
const total = ref(-1);
const currentDeviceName = ref();
onMounted(async () => {
    initList();
    setTimeout(() => {
        initList()
    }, 1000);
    currentDeviceName.value = await localStorage.getItem('deviceName')
})

async function initList() {
    const { data } = await User.Devices.list(pageInfo.value)
    listData.value = data.data.list;
    total.value = data.data.total;

}

const isShowUpdateNameModal = ref(false);
const newDeviceName = ref('');
function btnUpdateCurrentDeviceName() {
    isShowUpdateNameModal.value = true;
}
async function btnUpdate() {
    for (let index = 0; index < listData.value.length; index++) {
        const item = listData.value[index];
        if (item.name === currentDeviceName.value) {
            const { data } = await User.Devices.updateName(item.id, newDeviceName.value);
            if (data.code < 300) {
                localStorage.setItem('deviceName', newDeviceName.value);
                currentDeviceName.value = newDeviceName.value;
                isShowUpdateNameModal.value = false;
                newDeviceName.value = '';
                initList()
            } else {
                useToast().error(data.msg)
            }
            return;
        }
    }
}

const isShowDeleteModal = ref(false);
const delDeviceName = ref<string | null>('')
let delId = -1;
function btnDeleteItem(device: Model.UserDevice) {
    delDeviceName.value = device.name;
    isShowDeleteModal.value = true;
    delId = device.id;
}
async function btnDoDel() {
    const { data } = await User.Devices.del(delId);
    if (data.code < 300) {
        initList();
        isShowDeleteModal.value = false;
        delDeviceName.value = '';
        delId = -1;
    }
}
</script>
