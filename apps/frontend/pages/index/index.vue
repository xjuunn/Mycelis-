<template>
    <div class="h-full flex flex-col">
        <div class="border-b border-base-content/10 h-10 flex items-center pl-2 pr-2 gap-2 text-sm">
            <div class="flex-1">

            </div>
            <div>
                <button class="btn btn-ghost btn-sm" @click="openProjectURL">
                    <Icon name="mingcute:github-fill"></Icon>
                    项目地址
                </button>
            </div>
        </div>
        <div class="overflow-scroll scroll-smooth flex-1 p-2">
            <index-banner @btn-show-commit-list="showCommitList"></index-banner>
            <div class="ml-2 mt-5 text-lg font-bold">
                <span>提交频率</span>
            </div>
            <index-contribute-heatmap></index-contribute-heatmap>
            <div class="ml-2 mt-5 text-lg font-bold">
                <span ref="commitListTitle">提交记录</span>
            </div>
            <index-commit-list></index-commit-list>
        </div>
    </div>
</template>
<script setup lang="ts">
import { openUrl } from '@tauri-apps/plugin-opener';
import * as APPAPI from '~/api/app'
const commitListTitle = useTemplateRef('commitListTitle');
function showCommitList() {
    if (commitListTitle.value) {
        commitListTitle.value.scrollIntoView({
            behavior: 'smooth'
        })
    }
}
async function openProjectURL() {
    const { data } = await APPAPI.Info.gitInfo();
    openUrl(data.data.url)

}
</script>