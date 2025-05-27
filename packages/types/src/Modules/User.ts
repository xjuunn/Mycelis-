import { UserRole, UserStatus } from "../Enum/index"

export type User = {
    id: number
    name: string
    displayName: string | null
    passwordHash: string
    avatarUrl: string | null
    status: UserStatus
    role: UserRole
    isActive: boolean
    createAt: Date
    updateAt: Date
    lastLoginAt: Date | null
}