<template>
    <div class="quill-editor-container" ref="editorContainer" :class="{ 'read-only': props.readOnly }">
        <div ref="editorElement"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, type Ref } from 'vue'
import Quill, { Range, type Delta, type QuillOptions } from 'quill'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
const { isMobile } = useDevice()
type ToolbarOption =
    | string
    | { header?: number | boolean }
    | { list?: 'ordered' | 'bullet' }
    | { script?: 'sub' | 'super' }
    | { indent?: string }
    | { direction?: 'rtl' }
    | { color?: string[] }
    | { background?: string[] }
    | { align?: string[] }
    | { font?: string[] }
    | { size?: string[] }

interface EditorModules {
    toolbar?: boolean | ToolbarOption[] | {
        container: ToolbarOption[]
        handlers?: Record<string, any>
    }
    keyboard?: { bindings: Record<string, any> }
    clipboard?: { matchers?: Array<any>; matchVisual?: boolean }
    history?: { delay?: number; maxStack?: number; userOnly?: boolean }
    [key: string]: any
}

interface EditorProps {
    modelValue?: string
    placeholder?: string
    theme?: 'snow' | 'bubble'
    modules?: EditorModules
    readOnly?: boolean
    toolbar?: boolean | ToolbarOption[]
    isKeyboardOpen?: boolean
}

const props = withDefaults(defineProps<EditorProps>(), {
    modelValue: '',
    placeholder: '请输入内容...',
    theme: 'snow',
    readOnly: false,
    toolbar: true,
    modules: () => ({})
})

interface EditorEmits {
    (e: 'update:modelValue', value: string): void
    (e: 'ready', editor: Quill): void
    (e: 'change', value: string, delta: Delta, source: 'api' | 'user' | 'silent'): void
    (e: 'focusin'): void
    (e: 'focusout'): void
    (e: 'update:isKeyboardOpen', value: boolean): void
}


const emit = defineEmits<EditorEmits>()
const editorElement: Ref<HTMLElement | null> = ref(null)
const quillInstance: Ref<Quill | null> = ref(null)
const editorContainer: Ref<HTMLElement | null> = ref(null)
const mergedModules = computed(() => ({
    ...props.modules,
    toolbar: props.toolbar !== undefined ? props.toolbar : props.modules?.toolbar
}))

const initEditor = (): void => {
    if (!editorElement.value) return

    const options: QuillOptions = {
        theme: props.theme,
        placeholder: props.placeholder,
        readOnly: props.readOnly,
        modules: mergedModules.value
    }

    const editor = markRaw(new Quill(editorElement.value, options));
    quillInstance.value = editor

    if (props.modelValue) {
        editor.clipboard.dangerouslyPasteHTML(props.modelValue)
    }

    editor.on('text-change', (
        delta: Delta,
        oldDelta: Delta,
        source: 'api' | 'user' | 'silent'
    ) => {
        const html = editor.root.innerHTML
        emit('update:modelValue', html)
        emit('change', html, delta, source)
    })

    emit('ready', editor)
}

const updateReadOnly = (readOnly: boolean): void => {
    if (quillInstance.value) {
        quillInstance.value.enable(!readOnly)
    }
}
let originalHeight = 0;
function onResize() {
    const currentHeight = window.visualViewport?.height ?? 0
    if (currentHeight === originalHeight && isMobile) {
        quillInstance.value?.blur()
    }
}
function closeKeyboard() {
    quillInstance.value?.blur()
}
function openKeyboard() {
    try {
        if (quillInstance.value) quillInstance.value.focus()
    } catch { }
}
watch(() => props.isKeyboardOpen, (value) => {
    value ? openKeyboard() : closeKeyboard()
})
onMounted(() => {
    originalHeight = window.visualViewport?.height ?? 0
    window.addEventListener('resize', onResize)
    nextTick(() => {
        initEditor()
        editorContainer.value?.addEventListener('focusin', onFocusIn);
        editorContainer.value?.addEventListener('focusout', onFocusOut);
    })

})
const onFocusIn = () => {
    emit('focusin');
    emit('update:isKeyboardOpen', true);
};
const onFocusOut = () => {
    emit('focusout');
    emit('update:isKeyboardOpen', false);
};

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    if (quillInstance.value) {
        quillInstance.value.off('text-change')
    }
    if (editorContainer.value) {
        editorContainer.value.removeEventListener('focusin', onFocusIn);
        editorContainer.value.removeEventListener('focusout', onFocusOut);
    }
})

watch(() => props.modelValue, (newVal: string) => {
    if (quillInstance.value) {
        const currentContent = quillInstance.value.root.innerHTML
        if (newVal !== currentContent) {
            quillInstance.value.clipboard.dangerouslyPasteHTML(newVal)
        }
    }
})

watch(() => props.readOnly, (newVal: boolean) => {
    updateReadOnly(newVal)
})

watch(() => props.theme, () => {
    nextTick(() => {
        if (quillInstance.value) {
            quillInstance.value.updateContents([])
        }
    })
})

interface EditorExpose {
    getEditor: () => Quill | null
    getContent: () => string
    setContent: (content: string) => void
    getDelta: () => Delta | undefined
    focus: () => void
}

defineExpose<EditorExpose>({
    getEditor: () => quillInstance.value,
    getContent: () => quillInstance.value?.root.innerHTML || '',
    setContent: (content: string) => {
        if (quillInstance.value) {
            quillInstance.value.clipboard.dangerouslyPasteHTML(content)
        }
    },
    getDelta: () => quillInstance.value?.getContents(),
    focus: () => {
        if (quillInstance.value) {
            quillInstance.value.focus()
        }
    }
})
</script>

<style scoped>
.quill-editor-container {
    width: 100%;
    height: 100%;
}

.quill-editor-container.read-only :deep(.ql-toolbar) {
    display: none;
}

:deep(.ql-editor.ql-blank::before) {
    color: var(--color-base-content) !important;
    opacity: 1 !important;
}
</style>