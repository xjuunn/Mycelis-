<template>
  <div class="h-full flex flex-col items-center">
    <div class="navbar min-h-4 h-10 border-b border-b-base-content/10">

    </div>
    <div class="p-2 w-full h-full lg:w-9/12 max-w-[800px] overflow-y-auto">
      <div v-show="isLoading" class="w-full text-center mt-15">
        <div class="loading"></div>
      </div>
      <div v-motion-slide-visible-once-top v-show="listTotal == 0"
        class="w-full h-[80%] flex items-center justify-center flex-col">
        <Icon size="7rem" class="opacity-15" name="mingcute:empty-box-fill"></Icon>
        <div class="font-bold text-xl opacity-15">无好友申请</div>
      </div>
      <div v-for="item in listData" :key="item.id" class="rounded-lg flex p-3 hover:bg-base-200">
        <div class="indicator">
          <span v-show="item.sender.status == 'ONLINE'"
            class="indicator-item status status-success transform-[translate(-5px,5px)]"></span>
          <div class="rounded-full w-12 h-12 overflow-hidden avatar">
            <img :src="File.getFileUrl(item.sender.avatarUrl ?? '')">
          </div>
        </div>
        <div class="ml-2 flex-1">
          <div class="font-bold">{{ item.sender.displayName ?? item.sender.name }}
            <span class="text-xs opacity-60" v-show="item.sender.displayName">({{ item.sender.name }})</span>
          </div>
          <div class="text-sm">
            <span class="text-base-content/60 text-xs" v-if="item.sender.status == 'ONLINE'">[在线]</span>
            <span v-else class="text-base-content/60 text-xs">{{ lastLogin(item.sender.lastLoginAt) }}</span>
          </div>
        </div>
        <div class="flex items-center">
          <div class="join">
            <button class="btn btn-primary btn-sm btn-soft join-item" @click="btnAccept(item.id)">接受</button>
            <button class="btn btn-error btn-sm btn-soft join-item" @click="btnReject(item.id)">拒绝</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as Friend from '~/api/friend';
import * as File from '~/api/file';
import { Enums, type Model, type PageRequest } from '@mycelis/types';
const listData = ref<(Model.FriendRequest & { sender: Model.User })[]>([])
const isLoading = ref(true);
const listTotal = ref(-1);
const pageInfo = ref<PageRequest>({
  skip: 0,
  take: 15
})
onMounted(() => {
  initData();
})
async function initData() {
  isLoading.value = true;
  let { data } = await Friend.FriendRequest.listReceived(Enums.FriendRequestStatus.PENDING, pageInfo.value);
  listData.value = data.data.list
  listTotal.value = data.data.total
  isLoading.value = false;
}
const lastLogin = (time: Date | null) => {
  if (time == null)
    return '';
  return timeSince(time)
}

// 计算时间差
function timeSince(date: Date) {
  date = new Date(date)
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "年前";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "个月前";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "天前";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "小时前";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "分钟前";
  return '刚刚';
}
function btnAccept(id: number) {
  Friend.FriendRequest.accept(id).then(({ data }) => {
    useToast().success(data.msg);
    listData.value = listData.value.filter(item => item.id !== id)
    listTotal.value--;
  }).catch(e => {
    useToast().error(e.msg);
  })
}
async function btnReject(id: number) {
  Friend.FriendRequest.reject(id).then(({ data }) => {
    useToast().success(data.msg);
    listData.value = listData.value.filter(item => item.id !== id)
    listTotal.value--;
  }).catch(e => {
    useToast().error(e.msg);
  })
}
</script>
