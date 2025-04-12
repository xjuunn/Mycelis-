import { PageRequest } from '@mycelis/types';
import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const PageInfo = createParamDecorator((_: unknown, ctx: ExecutionContext): PageRequest => {
    const { skip, take } = ctx.switchToHttp().getRequest().query;
    return new PageRequest(Number(skip ?? 0), Number(take ?? 15))
})
