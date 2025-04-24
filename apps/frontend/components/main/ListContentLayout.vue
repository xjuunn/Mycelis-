<template>
    <div class="w-full h-full flex">
        <div v-show="isShowList"
            class="sm:w-[40%] w-full sm:max-w-[300px] sm:border-r sm:border-r-base-content/10 flex flex-col">
            <div class="h-14 border-b border-b-base-content/10 bg-base-200 pl-3 pr-3 flex items-center gap-3">
                <div class="text-lg">{{ props.title }}</div>
                <div class="h-full flex-1 flex justify-end items-center p-3">

                </div>
            </div>
            <div class="flex-1 overflow-y-scroll min-h-0">
                <slot name="list"></slot>
            </div>
        </div>
        <div class="flex-1 flex flex-col" v-if="isShowContent">
            <div class="h-14 bg-base-200 border-b border-b-base-content/10">
                <slot name="contentTop"></slot>
            </div>
            <div class="flex-1">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';
let pointer = useBreakpoints(breakpointsTailwind)
let isShowContent = ref(false);
let isShowList = ref(true);
let props = defineProps(['title']);
let route = useRoute();
watch(() => pointer.sm.value, () => {
    checkUI();
})
watch(() => route.query, () => {
    checkUI();
})
onMounted(() => {
    checkUI();
})

function checkUI() {
    isShowContent.value = true;
    isShowList.value = true;
    useDockStore().setHidden(false);
    if (pointer.sm.value) {
    } else if (route.query.ui == 'content') {
        isShowList.value = false;
        useDockStore().setHidden(true);
    } else {
        isShowContent.value = false;
    }
}

</script>