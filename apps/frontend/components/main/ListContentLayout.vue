<template>
    <div class="w-full h-full flex">
        <div class="sm:w-[40%] w-full sm:max-w-[300px] sm:border-r sm:border-r-base-content/10">
            <div class="h-14 border-b border-b-base-content/10 bg-base-200 pl-3 pr-3 flex items-center gap-3">
                <div class="text-lg">{{ props.title }}</div>
                <div class="h-full flex-1 flex justify-end items-center p-3">
                    
                </div>
            </div>
            <slot name="list"></slot>
        </div>
        <div class="flex-1 " v-if="isShowContent">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';
let pointer = useBreakpoints(breakpointsTailwind)
let isShowContent = ref(false);
let props = defineProps(['title']);
watch(pointer.sm, () => {
    isShowContent.value = pointer.sm.value
})
onMounted(() => {
    isShowContent.value = pointer.sm.value
})
</script>