import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { Result } from '@mycelis/types';
import { JwtService } from '@nestjs/jwt';
import { Crypto } from '@mycelis/utils';
import { Prisma, Types } from '@mycelis/database';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { };
    async signIn(name: string, password: string) {
        let user = await this.userService.findOne(name);
        if (!user) throw new UnauthorizedException('用户名不存在')
        if (!Crypto.UserPasswordCrypto.verifyPassword(user?.passwordHash, password)) throw new UnauthorizedException("密码错误");
        const payload = { id: user.id, name: user.name, role: user.role };
        return new Result({
            token: await this.jwtService.signAsync(payload),
            user
        }, 200, '登录成功')
    }

    signUp(name: string, password: string, avatar: string): Prisma.Prisma__UserClient<Types.User> {
        return this.userService.create({ name, passwordHash: password, avatarUrl: avatar })
    }
}
