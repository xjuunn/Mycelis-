export const useLogger = defineStore('logger', () => {
    const _loggerList = ref<LoggerItem[]>([]);
    const loggerList = computed(() => _loggerList.value);

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
        if (!useAppStore().debug) return;
        if (_loggerList.value.length >= 500)
            _loggerList.value.shift();
        _loggerList.value.push(item);
    }

    return {
        loggerList, logDefault, logSuccess, logError, log
    };
})

export type LoggerItem = {
    text: string;
    styles: string[]
}