<template>
    <div class="flex h-full">
        <ClientOnly>
            <div v-if="sm || $route.query.ui !== 'content'" v-motion-slide-left
                class="flex-1 flex min-h-full sm:max-w-[300px] sm:border-r sm:border-r-base-content/10 flex-col">
                <div class="navbar border-b border-b-base-content/10" v-if="$props.isShowTitle">
                    <div class="navbar-start pl-2">{{ props.title }}</div>
                    <div class="navbar-end">
                        <slot name="title-right"></slot>
                    </div>
                </div>
                <div class="flex-1 flex flex-col min-h-0">
                    <slot name="list"></slot>
                </div>
            </div>
            <div v-if="sm || $route.query.ui == 'content'" class="flex-1" v-motion-slide-right>
                <slot name="content"></slot>
            </div>
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";
const { sm } = useBreakpoints(breakpointsTailwind);
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    isShowTitle: {
        type: Boolean,
        default: true
    }
})
</script>