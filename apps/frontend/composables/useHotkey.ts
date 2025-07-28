const { current } = useMagicKeys();
const keymap = new Map<string, KeyInfo>();
export const useHotKey = () => {

    function init() {
        watch(current, (keys) => {
            if (keys.size <= 1) return;
            if (!keys.has('control') && !keys.has('alt')) return;
            const key = Array.from(keys).join('+')
            if (keymap.has(key)) {
                const info = keymap.get(key);
                if (info) {
                    info.handler();
                }
            }
        });
        defaultKey();
    }

    function defaultKey() {
        registerKey('control+k', {
            group: '搜索',
            name: '打开搜索面板',
            handler: () => {
                useSearchModal().openModal();
            }
        })
        registerKey('', {
            group: '搜索',
            name: '打开搜索面板',
            handler: () => {
                useSearchModal().openModal();
            }
        })
    }

    function registerKey(key: string, info: KeyInfo) {
        if (keymap.has(key)) {
            console.warn(`热键 ${key} 已经被注册.`);
            return;
        }
        keymap.set(key, info);
    }

    function unregisterKey(key: string) {
        if (!keymap.has(key)) return;
        keymap.delete(key);
    }

    return {
        init,
        current,
        registerKey,
        unregisterKey
    }
}

export type KeyInfo = {
    group?: string,
    name?: string,
    handler: () => void
}