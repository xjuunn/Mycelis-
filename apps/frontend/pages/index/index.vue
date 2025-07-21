<template>
    <div>
        <button class="btn btn-primary btn-sm" @click="test">test</button>
        <div v-for="item in listData">
            {{ item }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as APP from '~/api/app';
let listData = ref<APP.Info.GitLogsResultCommitItem[]>([])
async function test() {
    const { data } = await APP.Info.gitLogs(0, 15);
    listData.value = data.data.commits;
    console.log(data.data.commits[0].committer.relativeTime);

}

</script>
