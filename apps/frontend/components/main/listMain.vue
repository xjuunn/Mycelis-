<template>
    <div class="w-60 bg-base-300 rounded-lg mt-1 mb-1">
        <div class="h-12 border-b border-b-base-content/10 items-center p-2 flex">
            <div class="ml-2 flex-1">{{ props.title }}</div>
            <div class="mr-2 flex items-center text-xs">
                <slot name="titleRight"></slot>
            </div>
        </div>
        <div class="overflow-y-scroll h-[calc(100vh-var(--spacing)*12)]">
            <slot name="list"></slot>
        </div>
    </div>
    <div class="flex-1 m-1 bg-base-300 rounded-lg flex flex-col">
        <div class="h-12 min-h-12 border-b border-b-base-content/10 flex items-center pl-3 pr-3">
            <slot name="mainTop"></slot>
        </div>
        <slot name="main"></slot>
    </div>
</template>

<script setup lang="ts">
let props = defineProps({
    title: {
        required: true,
        type: String
    }
})

</script>