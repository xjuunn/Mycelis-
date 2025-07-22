<template>
    <div class="h-full overflow-scroll p-2">
        <!-- <index-commit-list></index-commit-list> -->
        <index-contribute-heatmap></index-contribute-heatmap>
    </div>
</template>

<script setup lang="ts">
import * as APP from '~/api/app'
onMounted(() => {
    init();
})
async function init() {


}
</script>