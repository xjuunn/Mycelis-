import { Types } from '@mycelis/database';
import type { Result } from '@mycelis/types';
import { io, type Socket } from 'socket.io-client';
let socket: Socket | null = null;
export const useSocket = () => {
    if (socket === null) {
        socket = io(useAppStore().baseurl,
            { extraHeaders: { 'Authorization': useAxios().getToken() } });
        const deviceName = localStorage.getItem("deviceName");
        socket.emit('client:connect', { name: deviceName, os: "Browser" }, ({ data }: any) => {
            localStorage.setItem("deviceName", data.name);
        })
    }
    function emit<T = any>(ev: string, data: any = {}): Promise<Result<T>> {
        return new Promise((res, rej) => {
            socket?.emit(ev, data, (msg: Result) =>
                Math.floor(msg.code / 100) === 2 ? res(msg) : rej(msg))
        })
    }
    return {
        socket, emit
    }
}