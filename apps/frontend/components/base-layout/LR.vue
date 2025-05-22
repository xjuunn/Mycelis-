<template>
    <div class="flex h-full">
        <ClientOnly>
            <div v-if="sm || $route.query.ui !== 'content'" v-motion-slide-left="animeLeft"
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
            <div v-if="sm || $route.query.ui == 'content'" class="flex-1" v-motion-slide-right="animeRight">
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
const animeLeft = ref({
    initial: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1, transition: { duration: 0 } },
    delay: 200
})
const animeRight = ref({
    initial: { x: 100, opacity: 0 },
    enter: { x: 0, opacity: 1, transition: { duration: 0 } },
    delay: 200
})
watch(useRoute(), () => {
    animeLeft.value.enter.transition.duration = 200
    animeRight.value.enter.transition.duration = 250

})
</script>