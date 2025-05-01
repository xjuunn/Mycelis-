import { io, type Socket } from "socket.io-client"

export const useSocket = defineStore('socket', () => {
    let _socket = ref(io(useAppStore().baseurl,
        { extraHeaders: { 'Authorization': useAxios().getToken() } }));
    let socket = computed(() => _socket.value);

    return {
        socket
    }
})