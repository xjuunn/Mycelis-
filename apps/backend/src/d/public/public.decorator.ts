import { SetMetadata } from '@nestjs/common';

// export const Public = (...args: string[]) => SetMetadata('public', args);
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
