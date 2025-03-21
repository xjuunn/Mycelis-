import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
    const appname = 'mycelis';
    return {
        appname
    }
})