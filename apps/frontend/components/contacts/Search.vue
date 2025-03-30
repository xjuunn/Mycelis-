<template>
    <div class="h-full flex items-center justify-center">
        <input v-model="searchStr" type="text" class="input focus-within:outline-none" placeholder="搜索">
    </div>
</template>

<script setup lang="ts">
let searchStr = ref('');

</script>