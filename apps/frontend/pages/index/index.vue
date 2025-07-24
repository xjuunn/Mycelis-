<template>
    <div class="h-full flex flex-col">
        <div class="border-b border-base-content/10 h-10">

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
const commitListTitle = useTemplateRef('commitListTitle');
function showCommitList() {
    if (commitListTitle.value) {
        commitListTitle.value.scrollIntoView({
            behavior: 'smooth'
        })
    }
}
</script>