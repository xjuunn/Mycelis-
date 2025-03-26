import * as crypto from 'crypto';

export function hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex'); // 生成随机盐值
    const hash = crypto.scryptSync(password, salt, 64).toString('hex'); // 64字节输出
    return `${salt}:${hash}`; // 存储时组合盐值和哈希
}

export function verifyPassword(storedHash: string, inputPassword: string): boolean {
    const [salt, originalHash] = storedHash.split(':');
    const inputHash = crypto.scryptSync(inputPassword, salt, 64).toString('hex');
    return inputHash === originalHash;
}