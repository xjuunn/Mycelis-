import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TokenInfo => {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();
      return request.user as TokenInfo;
    } else if (ctx.getType() === 'ws') {
      const client = ctx.switchToWs().getClient();
      return client.user as TokenInfo;
    } else {
      throw new BadRequestException('未知的请求类型');
    }
  },
);

export type TokenInfo = {
  id: number;
  name: string;
  role: string;
  iat: number;
};
