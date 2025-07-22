<template>
    <div class="p-2">
        <div>
            {{ useApp().isTauri }}
            <b>更新</b>
        </div>
        <div v-show="isLoading" class="flex items-center justify-center h-30">
            <div class="loading"></div>
        </div>
        <div class="mt-4 rounded-lg text-base-content/80 border border-base-content/0 p-4 hover:border-base-content/10 hover:bg-base-200"
            v-for="item in listData" v-motion-slide-visible-right>
            <div class="flex">
                <div class="flex-1">
                    提交者：{{ item.committer.name }}
                    <span @click="doOpenUrl(`mailto:${item.committer.email}?subject=反馈`)"
                        class="text-sm opacity-60 link hover:opacity-90 text-success">
                        ({{ item.committer.email }})
                    </span>
                </div>
                <div class="text-sm opacity-60">
                    <span
                        v-if="new Date().getTime() - new Date(item.committer.date).getTime() > 1000 * 60 * 60 * 24 * 7">
                        {{ new Date(item.committer.date).toLocaleDateString() }}
                    </span>
                    <span v-else>
                        {{ item.committer.relativeTime.replace('hours ago', '小时前').replace('days ago', '天前')
                            .replace('minutes ago', '分钟前').replace('seconds ago', '秒前') }}
                    </span>

                </div>
            </div>
            <div class="inline-flex gap-1 items-center">
                <a @click="doOpenUrl(`${gitInfo?.url}/commit/${item.shortHash}`)"
                    class="link opacity-60 hover:opacity-90 text-accent">#{{ item.shortHash }}</a>
                <div v-show="item.title.includes(':')" class="badge badge-sm badge-soft" :class="{
                    'badge-success': item.title.slice(0, item.title.indexOf(':')).includes('feat'),
                    'badge-info': item.title.slice(0, item.title.indexOf(':')).includes('style'),
                    'badge-accent': item.title.slice(0, item.title.indexOf(':')).includes('fix'),
                    'badge-primary': item.title.slice(0, item.title.indexOf(':')).includes('refactor'),
                }">{{ item.title.slice(0, item.title.indexOf(':')) }}</div>
                {{ item.title.slice(item.title.indexOf(':') + 1) }}
                <span v-show="item.body" class="link opacity-60 hover:opacity-90"
                    @click="showUpdateModal(item)">详情</span>
            </div>
        </div>
        <br>
        <div class="flex justify-end">
            <div class="join mr-3" v-show="!isLoading">
                <button class="btn btn-primary join-item btn-sm btn-soft" @click="btnPreviousPage">上一页</button>
                <button class="btn btn-primary join-item btn-sm btn-soft" @click="btnNextPage">下一页</button>
            </div>
        </div>
        <br>
        <modal title="更新详情" :is-show="isShowUpdateModal" @on-backdrop-click="closeUpdateModal">
            <template #content>
                <div class="text-base-content/90 mt-2">
                    <div class="flex">
                        <div class="flex-1">提交者: {{ updateDetails?.committer.name }}</div>
                        <div class="text-base-content/60">{{ updateDetails?.shortHash }}</div>
                    </div>
                    提交信息: {{ updateDetails?.title }} <br>
                    详情: {{ updateDetails?.body }}
                </div>
            </template>
            <template #action>
                <button class="btn btn-sm join-item btn-ghost" @click="closeUpdateModal">关闭</button>
            </template>
        </modal>
    </div>
</template>

<script lang="ts" setup>
import { openUrl } from '@tauri-apps/plugin-opener'
import * as APP from '~/api/app';
let listData = ref<APP.Info.GitLogsResultCommitItem[]>([])
const isShowUpdateModal = ref(false);
const isLoading = ref(true);
const updateDetails = ref<APP.Info.GitLogsResultCommitItem>();
const gitInfo = ref<APP.Info.GitInfoResult>()
const pageInfo = ref({
    pageNum: 1,
    pageSize: 15
})
onMounted(async () => {
    initData();
    const { data } = await APP.Info.gitInfo();
    gitInfo.value = data.data;
})
async function initData() {
    isLoading.value = true;
    listData.value = [];
    const { data } = await APP.Info.gitLogs((pageInfo.value.pageNum - 1) * pageInfo.value.pageSize, pageInfo.value.pageSize);
    listData.value = data.data.commits;
    isLoading.value = false;
}
function showUpdateModal(item: APP.Info.GitLogsResultCommitItem) {
    updateDetails.value = item
    isShowUpdateModal.value = true;

}
function closeUpdateModal() {
    isShowUpdateModal.value = false;
    updateDetails.value = undefined;
}

function btnNextPage() {
    if (listData.value.length < pageInfo.value.pageSize) return;
    pageInfo.value.pageNum++;
    initData();
}
function btnPreviousPage() {
    if (pageInfo.value.pageNum == 1) return;
    pageInfo.value.pageNum--;
    initData();
}
function doOpenUrl(url: string) {
    if (useApp().isTauri.value) {
        openUrl(url)
    } else {
        navigateTo(url, { open: { target: '_blank' } })
    }
}

</script>
