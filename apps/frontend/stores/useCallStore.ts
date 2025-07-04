
export const useCallStore = defineStore("call", () => {
    // 定义通话状态
    const _callStatus = ref<'Idle' | 'Initiating' | 'Active'>('Idle');
    // 是否在后台运行
    const _isBackground = ref<boolean>(false);

    const callStatus = computed(() => _callStatus.value);
    const isBackground = computed(() => _isBackground.value);

    function setBackground(isBackground: boolean) {
        _isBackground.value = isBackground;
    }

    function connect() {
        _callStatus.value = 'Initiating';
    }

    function disconnect() {
        _callStatus.value = 'Idle';
    }


    return {
        callStatus,
        connect,
        disconnect,
        isBackground,
        setBackground
    }
})

