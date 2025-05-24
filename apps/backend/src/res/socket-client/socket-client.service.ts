import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateDeviceDTO } from './types/CreateDeviceDTO';
import { prisma } from '@mycelis/database';
import { Socket } from 'socket.io';
import { PageRequest, PageResultInfo } from '@mycelis/types';
import { SocketClientGateway } from './socket-client.gateway';
import { SayOnlineGateway } from './say-online.gateway';

@Injectable()
export class SocketClientService {

  constructor(
    private readonly sayOnlineGateway: SayOnlineGateway
  ) { }

  // 新增或修改设备
  async deviceConnect(
    createDeviceDTO: CreateDeviceDTO,
    userId: number,
    socket: Socket,
  ) {
    const device = await prisma.userDevice.upsert({
      where: { userId_name: { userId: userId, name: createDeviceDTO.name } },
      create: {
        userId,
        name: createDeviceDTO.name,
        os: createDeviceDTO.os,
        socketId: socket.id,
      },
      update: {
        name: createDeviceDTO.name,
        os: createDeviceDTO.os,
        socketId: socket.id,
      },
    });
    await this.setOnline(device.id, userId, true);
    const handleDisconnect = async () => {
      socket.off('disconnect', handleDisconnect);
      await this.setOnline(device.id, userId, false);
    };
    socket.off('disconnect', handleDisconnect);
    socket.on('disconnect', handleDisconnect);
    return device;
  }

  // 修改设备名称
  async updateDeviceName(userId: number, deviceId: number, name: string) {
    return prisma.userDevice.update({
      where: {
        id: deviceId, userId
      },
      data: {
        name
      }
    })
  }

  // 移除设备
  async removeDevice(deviceId: number, userId: number) {
    return prisma.userDevice.delete({
      where: { id: deviceId, userId },
    });
  }

  // 设置设备在线状态
  async setOnline(deviceId: number, userId: number, isOnline: boolean) {
    if (isOnline) {
      // 将用户设置为在线状态
      await prisma.user.update({
        where: { id: userId },
        data: {
          status: 'ONLINE',
          lastLoginAt: new Date()
        },
      });
      this.sayOnlineGateway.broadcastFriendIsOnline(userId, true);
      // 将设备设置为在线状态
      return prisma.userDevice.update({
        where: { id: deviceId, userId },
        data: {
          isOnline: true,
          connectedAt: new Date(),
        },
      });
    } else {
      const device = await prisma.userDevice.updateMany({
        where: { id: deviceId, userId },
        data: {
          isOnline: false,
          disconnectedAt: new Date(),
        },
      });
      // 获取用户所有在线设备的数量
      const count = await prisma.userDevice.count({
        where: { id: deviceId, userId, isOnline: true },
      });
      // 设置用户为离线状态
      if (count <= 0) {
        await prisma.user.update({
          where: { id: userId },
          data: { status: 'OFFLINE', lastLoginAt: new Date() },
        });
        this.sayOnlineGateway.broadcastFriendIsOnline(userId, false);
      }
      return device;
    }
  }

  // 获取用户的设备列表
  async findDevices(userId: number, pageInfo: PageRequest) {
    const [list, count] = await Promise.all([
      prisma.userDevice.findMany({
        where: { userId: userId },
        orderBy: {
          connectedAt: 'desc'
        },
        take: +pageInfo.take,
        skip: +pageInfo.skip,
      }),
      prisma.userDevice.count({
        where: { userId: userId },
      }),
    ]);
    return new PageResultInfo(list, count, pageInfo.skip, pageInfo.take);
  }

  // 获取用户的设备
  async findOneDevice(deviceId: number, userId: number) {
    return prisma.userDevice.findUnique({
      where: { id: deviceId, userId },
    });
  }
}
