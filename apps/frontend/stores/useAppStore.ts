import { defineStore } from "pinia";
import type { Types } from '@mycelis/database';
export const useAppStore = defineStore("app", () => {
    let runtimeConfig = useRuntimeConfig();
    const appname = 'mycelis';
    const _base_url = ref(runtimeConfig.public.BASE_URL);
    const _user: Ref<Types.User | undefined> = ref()
    const baseurl = computed(() => _base_url.value)
    const user = computed(() => _user.value)
    function setUser(user: Types.User) {
        _user.value = user;
    }
    return {
        appname,
        baseurl,
        user,
        setUser,
    }
})