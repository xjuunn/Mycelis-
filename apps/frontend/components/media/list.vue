<template>
    <div data-tauri-drag-region class="border h-full p-2 grid items-center justify-center gap-2 overflow-y-auto"
        :class="gridClass">
        <div class="aspect-video">
            <div class="border h-full flex items-center justify-center gap-2">
                <button class="btn btn-sm btn-accent" @click="decrementCount">-1</button>
                {{ count }}
                <button class="btn btn-sm btn-accent" @click="incrementCount">+1</button>
            </div>
        </div>
        <div class="aspect-video" v-for="item in count" :key="item">
            <MediaItem />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';

const { md, lg, xl, '2xl': xxl } = useBreakpoints(breakpointsTailwind);

const count = ref(0);

const decrementCount = () => {
    if (count.value <= 0) return;
    count.value--;
};

const incrementCount = () => {
    count.value++;
};

const gridClass = computed(() => {
    const totalItems = count.value + 1;
    if (lg.value) {
        if (totalItems === 2) return 'grid-cols-2';
        if (totalItems === 3 || totalItems === 4) return 'grid-cols-2';
        if (totalItems === 5 || totalItems === 6) return 'grid-cols-3';
        if (xxl.value) {
            if (totalItems <= 8) return 'grid-cols-4';
            return 'grid-cols-5';
        }
        if (xl.value) {
            if (totalItems <= 6) return 'grid-cols-3';
            return 'grid-cols-4';
        }
        if (totalItems <= 4) return 'grid-cols-2';
        return 'grid-cols-3';
    }
    if (md.value) {
        if (totalItems <= 2) return 'grid-cols-1';
        return 'grid-cols-2';
    }
    return 'grid-cols-1';
});
</script>