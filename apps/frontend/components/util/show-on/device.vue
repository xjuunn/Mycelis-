<template>
    <ClientOnly>
        <div v-show="shouldShow">
            <slot :is-tauri="isTauri" />
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
const device = useDevice();
type DeviceKey = keyof typeof device;
const props = defineProps({
    showOn: {
        type: [String, Array] as PropType<DeviceKey | DeviceKey[]>,
        default: undefined
    },
    tauri: {
        type: Boolean,
        default: undefined
    }
});
const isTauri = computed(() => {
    return '__TAURI_INTERNALS__' in window;
});
const shouldShow = computed(() => {
    let shouldTauriShow = true;
    let shouldDeviceShow = true;
    if (props.tauri !== undefined)
        shouldTauriShow = isTauri.value === props.tauri;
    if (props.showOn) {
        const keys = Array.isArray(props.showOn) ? props.showOn : [props.showOn];
        shouldDeviceShow = keys.some((key) => device[key]);
    }
    return shouldTauriShow && shouldDeviceShow;
});
</script>
