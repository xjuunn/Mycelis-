<template>
    <div class="h-12 flex items-center p-2 gap-1 border-b border-base-content/10">
        <Icon name="mingcute:search-2-line" size="1.2rem"></Icon>
        <span class="text-base-content/70 flex-1 text-sm">
            <input ref="inputEL" @input="onInput" v-model="text" type="text" autofocus="true" tabindex="1"
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
const inputEl = useTemplateRef('inputEL')
const emit = defineEmits<{
    (e: 'onTextChange', value: string): void
}>()

const mode = computed(() => {
    if (text.value[0] === '/') return 'command';
    return 'default';
})
function btnClose() {
    text.value = '';
}
function onInput() {
    onTextChange()
}
function onTextChange() {
    emit('onTextChange', text.value)
}

</script>