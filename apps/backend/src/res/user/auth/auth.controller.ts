import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Result } from '@mycelis/types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signIn')
    signIn(@Body('name') name: string, @Body('password') password: string) {
        if (!name || !name.length)
            return new Result("请输入用户名", 200, "请输入用户名");
        if (!password || !password.length)
            return new Result('请输入密码', 200, "请输入密码");
        return this.authService.signIn(name, password);
    }
}
