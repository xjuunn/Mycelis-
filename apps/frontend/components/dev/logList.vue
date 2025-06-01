<template>
    <div class="overflow-y-auto">
        <div v-for="item in loggerList">
            <span class="wrap-break-word" v-for="(span, index) in item.text.split('%c')"
                :style="item.styles[index - 1]">
                {{ span }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
const { loggerList } = useLogger();
</script>