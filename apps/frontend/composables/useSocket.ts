import type { Result } from '@mycelis/types';
import { io, type Socket } from 'socket.io-client';
let socket: Socket | null = null;
export const useSocket = () => {
    if (import.meta.server) return;
    function init(refresh: boolean = false) {
        if ((socket === null || refresh) && import.meta.client) {
            socket = null;
            // 初始化socket
            socket = io(useAppStore().baseurl,
                { extraHeaders: { 'Authorization': useAxios().getToken() } });
            const deviceName = localStorage.getItem("deviceName"); // 获取当前的设备名
            // 注册设备
            socket.emit('client:connect', { name: deviceName, os: "Browser" }, ({ data }: any) => {
                localStorage.setItem("deviceName", data.name); // 更新设备名
            });
        }
    }
    function emit<T = any>(ev: string, data: any = {}): Promise<Result<T>> {
        return new Promise((res, rej) => {
            socket?.emit(ev, data, (msg: Result) =>
                Math.floor(msg.code / 100) === 2 ? res(msg) : rej(msg))
        })
    }

    return {
        socket, emit, init
    }
}