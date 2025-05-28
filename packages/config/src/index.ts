import path from 'path';
import { Config } from './types/config';

export function getConfig(configName: keyof Config): string {
    const dotenv = require('dotenv');
    dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
    return String(process.env[configName] || '');
}

export type { Config } from './types/config';