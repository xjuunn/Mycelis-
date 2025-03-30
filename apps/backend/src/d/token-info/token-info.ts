import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const Token = createParamDecorator((data: unknown, ctx: ExecutionContext):TokenInfo => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as TokenInfo;
})

export type TokenInfo = {
    id: number,
    name: string,
    role: string,
    iat: number
}
