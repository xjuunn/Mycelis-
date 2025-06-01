export const useLogger = defineStore('logger', () => {
    const _debug = ref(true);
    const _loggerList = ref<LoggerItem[]>([]);
    const debug = computed(() => _debug.value);
    const loggerList = computed(() => _loggerList.value);

    onMounted(() => {
        showHello()
    })

    function showHello() {
        log(useConsoleLog().builder.default('设备名:').addBackground('primary').default(localStorage.getItem('deviceName') + ""));
        log(useConsoleLog().builder.default('用户:').addBackground('primary').default(localStorage.getItem('user') + ""));
    }

    function setDebug(d: boolean) {
        _debug.value = d;
        if (d) showHello();
    }
    function logDefault(text: string, bold: boolean = false, underline: boolean = false) {
        log(useConsoleLog().builder.default(text, bold, underline));
    }

    function logSuccess(text: string, bold: boolean = false, underline: boolean = false) {
        log(useConsoleLog().builder.success(text, bold, underline));
    }

    function logError(text: string, bold: boolean = false, underline: boolean = false) {
        log(useConsoleLog().builder.error(text, bold, underline));
    }

    function log(item: LoggerItem) {
        if (!_debug.value) return;
        if (_loggerList.value.length >= 500)
            _loggerList.value.shift();
        _loggerList.value.push(item);
    }

    return {
        loggerList, logDefault, logSuccess, logError, log,
        debug, setDebug
    };
})

export type LoggerItem = {
    text: string;
    styles: string[]
}