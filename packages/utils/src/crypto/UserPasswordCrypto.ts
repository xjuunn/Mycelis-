import * as crypto from 'crypto';

export function hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

export function verifyPassword(storedHash: string, inputPassword: string): boolean {
    const [salt, originalHash] = storedHash.split(':');
    const inputHash = crypto.scryptSync(inputPassword, salt, 64).toString('hex');
    return inputHash === originalHash;
}