<template>
    <div class="overflow-y-auto">
        <div v-for="item in loggerList" class="hover:bg-base-100 rounded-sm p-0.5">
            <span class="wrap-anywhere rounded-sm text-sm" v-for="(span, index) in item.text.split('%c')"
                :style="item.styles[index - 1]">
                <span v-if="!span.includes('\n')">{{ span }}</span>
                <span v-else v-for="(spanSlice, index) in span.split('\n')">{{ spanSlice }} <br /></span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
const { loggerList } = useLogger();
</script>