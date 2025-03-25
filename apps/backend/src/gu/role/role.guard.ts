import { Types } from '@mycelis/database';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/d/roles/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Types.UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!requireRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    if (!requireRoles.includes(user.role)) throw new UnauthorizedException()
    return true;
  }
}
