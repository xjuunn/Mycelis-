import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Result } from '@mycelis/types';
import { JwtService } from '@nestjs/jwt';
import { Crypto } from '@mycelis/utils';
import { prisma, Prisma, Types } from '@mycelis/database';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async signIn(name: string, password: string) {
    const user = await prisma.user.findUnique({ where: { name } });
    if (!user) throw new UnauthorizedException('用户名不存在');
    if (!Crypto.UserPasswordCrypto.verifyPassword(user?.passwordHash, password))
      throw new UnauthorizedException('密码错误');
    const payload = { id: user.id, name: user.name, role: user.role };
    return new Result(
      {
        token: await this.jwtService.signAsync(payload),
        user,
      },
      200,
      '登录成功',
    );
  }

  signUp(
    name: string,
    password: string,
    avatar: string,
  ): Prisma.Prisma__UserClient<Types.User> {
    return prisma.user.create({
      data: {
        name,
        passwordHash: Crypto.UserPasswordCrypto.hashPassword(password),
        avatarUrl: avatar,
      },
    });
  }
}
