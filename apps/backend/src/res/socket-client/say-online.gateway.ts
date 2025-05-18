import { prisma } from "@mycelis/database";
import { UseInterceptors } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SayOnlineGateway {

    @WebSocketServer()
    server: Server;

    /** 向好友广播自己的在线状态 */
    async broadcastFriendIsOnline(userId: number, isOnline: boolean) {
        const friendList = await prisma.friendship.findMany({
            where: {
                userId,
                friend: {
                    status: 'ONLINE'
                }
            },
        })
        friendList.forEach(friend => {
            this.server.to('user:' + friend.friendId).emit('user:online', { userId, isOnline, time: new Date() })
        })
    }
}