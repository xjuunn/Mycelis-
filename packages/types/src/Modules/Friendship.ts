export type Friendship = {
    id: number
    userId: number
    friendId: number
    note: string | null
    createAt: Date
    tagId: number | null
}