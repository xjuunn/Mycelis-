<template>
    <div class="flex relative" data-tauri-drag-region>
        <div class="flex-1" data-tauri-drag-region>
            <div class="flex-1 flex min-h-full sm:max-w-[300px] sm:border-r sm:border-r-base-content/10 flex-col"
                data-tauri-drag-region>

            </div>
        </div>
        <div class="inline-flex items-center justify-center gap-4 p-2" data-tauri-drag-region>
            <Icon class="text-base-content/70 hover:text-base-content/100 cursor-pointer" name="mingcute:minimize-line"
                size="0.9rem" @click="minimizeWindow"></Icon>
            <Icon class="text-base-content/70 hover:text-base-content/100 cursor-pointer" name="mingcute:square-line"
                size="0.8rem" @click="maximizeWindow"></Icon>
            <Icon class="text-base-content/70 hover:text-base-content/100 cursor-pointer" name="mingcute:close-line"
                size="0.9rem" @click="closeWindow"></Icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getCurrentWindow } from '@tauri-apps/api/window';

function minimizeWindow() {
    const window = getCurrentWindow();
    window.minimize();
}
function maximizeWindow() {
    const window = getCurrentWindow();
    window.toggleMaximize();
}
function closeWindow() {
    const window = getCurrentWindow();
    window.close();
}

</script>