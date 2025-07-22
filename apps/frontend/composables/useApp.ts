
export const useApp = () => {
    const isTauri = computed(() => {
        return '__TAURI_INTERNALS__' in window;
    });
    return {
        isTauri
    }
}