import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Result } from '@mycelis/types';
import { Public } from 'src/d/public/public.decorator';
import { Prisma, Types } from '@mycelis/database';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signIn')
    @Public()
    signIn(@Body('name') name: string, @Body('password') password: string) {
        if (!name || !name.length) throw new BadRequestException("请输入用户名");
        if (!password || !password.length) throw new BadRequestException("请输入密码");
        return this.authService.signIn(name, password);
    }

    @Post("signUp")
    @Public()
    signUp(@Body('name') name: string, @Body('password') password: string): Prisma.Prisma__UserClient<Types.User> {
        if (!name || !name.length) throw new BadRequestException("请输入用户名");
        if (!password || !password.length) throw new BadRequestException("请输入密码");
        if (name.length < 3) throw new BadRequestException("用户名过短");
        if (name.length > 20) throw new BadRequestException("用户名过长");
        if (password.length < 6) throw new BadRequestException("密码过短");
        if (password.length > 50) throw new BadRequestException("密码过长");
        if (!this.isValidName(name)) throw new BadRequestException("用户名只能由字母、数字、下划线组成");
        if (!this.isValidPassword(password)) throw new BadRequestException("密码只能由以下字符组成：​大写字母 A-Z、​小写字母 a-z、​数字 0-9、​特殊字符 !@#$%^&*()_");
        return this.authService.signUp(name, password);
    }

    isValidName(str: string): boolean {
        return /^[a-zA-Z0-9_]+$/.test(str);
    }

    isValidPassword(password: string): boolean {
        return /^[A-Za-z0-9!@#$%^&*()_]+$/.test(password);
    }
}


