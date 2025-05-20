<template>
    <dialog class="modal modal-bottom sm:modal-middle" :class="{ 'modal-open': props.isShow }">
        <div class="modal-box">
            <p class="font-bold text-lg" v-show="$props.title">{{ $props.title }}</p>
            <slot name="content"></slot>
            <div class="modal-action">
                <slot name="action"></slot>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button @click="$emit('onBackdropClick')">close</button>
        </form>
    </dialog>
</template>

<script lang="ts" setup>
const props = defineProps(['isShow', 'title'])
defineEmits<{
    onBackdropClick: () => void
}>()
</script>
