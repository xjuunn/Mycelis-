import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDeviceDTO } from './types/CreateDeviceDTO';
import { prisma } from '@mycelis/database';
import { Socket } from 'socket.io';
import { PageRequest, PageResultInfo } from '@mycelis/types';

@Injectable()
export class SocketClientService {
  private socketList = new Map<string, Socket>();

  async onApplicationBootstrap() {
    await prisma.userDevice.updateMany({
      data: {
        isOnline: false,
      },
    });
  }

  // 新增或修改设备
  async upsertDevice(
    createDeviceDTO: CreateDeviceDTO,
    userId: number,
    socket: Socket,
  ) {
    const device = await prisma.userDevice.upsert({
      where: {
        userId_name: {
          userId: userId,
          name: createDeviceDTO.name,
        },
      },
      create: {
        userId,
        name: createDeviceDTO.name,
        os: createDeviceDTO.os,
      },
      update: {
        name: createDeviceDTO.name,
        os: createDeviceDTO.os,
      },
    });
    if (!device.socketId) throw new BadRequestException('无效的SocketId');
    this.addSocket(device.socketId, socket);
    await this.setOnline(device.id, userId, true);
    socket.once('disconnect', async () => {
      await this.setOnline(device.id, userId, false);
    });
    console.log(this.socketList.keys());
    console.log('=================', this.socketList.size);
    return device;
  }

  // 添加socket
  addSocket(socketId: string, socket: Socket) {
    this.socketList.set(socketId, socket);
  }

  // 移除设备
  async removeDevice(deviceId: number, userId: number) {
    const device = await prisma.userDevice.delete({
      where: { id: deviceId, userId },
    });
    return this.removeSocket(device.socketId ?? '');
  }

  // 移除socket
  removeSocket(socketId: string) {
    this.socketList.delete(socketId);
  }

  // 设置设备在线状态
  async setOnline(deviceId: number, userId: number, isOnline: boolean) {
    if (isOnline) {
      // 将用户设置为在线状态
      await prisma.user.update({
        where: { id: userId },
        data: { status: 'ONLINE' },
      });
      // 将设备设置为在线状态
      return prisma.userDevice.update({
        where: { id: deviceId, userId },
        data: {
          isOnline: true,
          connectedAt: new Date(),
        },
      });
    } else {
      const device = await prisma.userDevice.update({
        where: { id: deviceId, userId },
        data: {
          isOnline: false,
          disconnectedAt: new Date(),
        },
      });
      // 获取用户所有在线设备的数量
      const count = await prisma.userDevice.count({
        where: { id: deviceId, userId },
      });
      // 设置用户为离线状态
      if (count <= 0) {
        await prisma.user.update({
          where: { id: userId },
          data: { status: 'OFFLINE' },
        });
      }
      // 将设备设置为离线
      return device;
    }
  }

  // 获取socket
  async getSocket(deviceId: number) {
    const device = await prisma.userDevice.findUnique({
      where: { id: deviceId },
    });
    return this.socketList.get(device?.socketId ?? '');
  }

  // 获取用户的设备列表
  async findDevices(userId: number, pageInfo: PageRequest) {
    const [list, count] = await Promise.all([
      prisma.userDevice.findMany({
        where: { userId: userId },
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
