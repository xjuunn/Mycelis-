import { DeviceType } from "../Enum/index"

export type UserDevice = {
    id: number
    userId: number
    socketId: string | null
    name: string | null
    os: DeviceType | null
    isOnline: boolean
    connectedAt: Date | null
    disconnectedAt: Date | null
    createAt: Date
}