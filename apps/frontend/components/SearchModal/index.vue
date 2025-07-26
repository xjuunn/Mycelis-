<template>
    <client-only>
        <teleport to="body">
            <dialog class="modal modal-bottom sm:modal-middle select-none" :class="{ 'modal-open': isOpen }">
                <div class="modal-box p-0 glass bg-base-300/50 outline-1 outline-base-content/11">
                    <SearchModalInput></SearchModalInput>
                    <div class="bg-base-300 h-12 flex items-center p-2 text-sm text-base-content/70">
                        <div class="flex-1 inline-flex items-center gap-1">
                            <kbd class="kbd kbd-sm">↑</kbd>
                            <kbd class="kbd kbd-sm">↓</kbd>
                            <kbd class="kbd kbd-sm">TAB</kbd>
                            选择
                            <kbd class="kbd kbd-sm ml-3">↵</kbd>选中
                        </div>
                        <div class="flex items-center gap-1">
                            <kbd class="kbd kbd-sm ml-3">/</kbd> 命令
                        </div>
                    </div>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button @click="isOpen = false"></button>
                </form>
            </dialog>
        </teleport>
    </client-only>
</template>

<script setup lang="ts">
const isOpen = ref(true);

</script>