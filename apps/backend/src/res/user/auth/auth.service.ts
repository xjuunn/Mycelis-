import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { Result } from '@mycelis/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { };
    async signIn(name: string, password: string) {
        let user = await this.userService.findOne(name);
        if (user?.passwordHash !== password)
            return new Result("用户名或密码错误", 401, "用户名或密码错误");
        const payload = { sub: user.id, name: user.name };
        return new Result({
            token: await this.jwtService.signAsync(payload),
            user
        }, 200, '登录成功')
    }
}
