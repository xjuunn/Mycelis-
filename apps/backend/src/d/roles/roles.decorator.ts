import { SetMetadata } from '@nestjs/common';
import { Types } from '@mycelis/database';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Types.UserRole[]) => SetMetadata(ROLES_KEY, roles);