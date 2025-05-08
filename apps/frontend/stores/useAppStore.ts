import { defineStore } from "pinia";
import type { Types } from '@mycelis/database';
export const useAppStore = defineStore("app", () => {
    let runtimeConfig = useRuntimeConfig();
    const appname = 'mycelis';
    const _base_url = ref(runtimeConfig.public.BASE_URL.replace('localhost', window?.location?.host).replace('127.0.0.1', window?.location?.host));
    const _user: Ref<Types.User | undefined> = ref()
    const baseurl = computed(() => _base_url.value)
    const user = computed(() => {
        if (import.meta.client)
            _user.value = JSON.parse(localStorage.getItem('user') ?? '{}');
        return _user.value
    })
    function setUser(user: Types.User) {
        user.passwordHash = '';
        localStorage.setItem('user', JSON.stringify(user))
        _user.value = user;
    }
    return {
        appname,
        baseurl,
        user,
        setUser,
    }
})