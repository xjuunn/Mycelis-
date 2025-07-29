<template>
    <div class="h-12 flex items-center p-2 gap-1 border-b border-base-content/10">

        <label class="swap swap-rotate">
            <input type="checkbox" :checked="mode == 'default'" />
            <Icon class="swap-on" name="mingcute:search-2-line"></Icon>
            <Icon class="swap-off" name="mingcute:terminal-line"></Icon>
        </label>
        <span class="text-base-content/70 flex-1 text-sm">
            <input ref="inputEL" @input="onInput" v-model="text" type="text" tabindex="0"
                class="input w-full bg-transparent border-0 focus-within:outline-0 shadow-none focus-within:shadow-none"
                placeholder="搜索 或 输入命令">
        </span>
        <button @click="btnClose">
            <Icon name="mingcute:close-line" size="1rem"></Icon>
        </button>
    </div>
</template>

<script setup lang="ts">
const text = useSearchModal().text;
const inputEl = useTemplateRef('inputEL');
const { focused } = useFocus(inputEl, { initialValue: true });
const emit = defineEmits<{
    (e: 'onTextChange', value: string): void

}>()

watch(() => useSearchModal().isshow.value, (isShow) => {
    if (isShow) {
        nextTick(() => {
            setTimeout(() => {
                if (inputEl.value) inputEl.value.focus();
                focused.value = true
            }, 100);
        })
    }
}, { immediate: true })
const mode = computed(() => {
    if (text.value[0] === '/') return 'command';
    return 'default';
})
function btnClose() {
    if (text.value) {
        text.value = '';
        onTextChange()
    } else {
        useSearchModal().closeModal();
    }
}
function onInput() {
    onTextChange()
}
function onTextChange() {
    emit('onTextChange', text.value)
}

</script>