import type { Model } from "@mycelis/types";
import { defineStore } from "pinia";
export const useAppStore = defineStore("app", () => {
    let runtimeConfig = useRuntimeConfig();
    const appname = 'mycelis';
    const _base_url = ref(runtimeConfig.public.BASE_URL.replace('localhost', window?.location?.hostname).replace('127.0.0.1', window?.location?.hostname));
    const _user: Ref<Model.User | undefined> = ref()
    const _debug = ref(true);
    const baseurl = computed(() => _base_url.value)
    const user = computed(() => {
        if (import.meta.client)
            _user.value = JSON.parse(localStorage.getItem('user') ?? '{}');
        return _user.value
    })
    const debug = computed(() => _debug.value);
    function setUser(user: Model.User) {
        user.passwordHash = '';
        localStorage.setItem('user', JSON.stringify(user))
        _user.value = user;
    }
    function setDebug(d: boolean) {
        _debug.value = d;
    }
    return {
        appname,
        baseurl,
        user,
        debug,
        setUser,
        setDebug
    }
})