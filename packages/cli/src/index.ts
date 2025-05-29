#!/usr/bin/env node
import { cac } from 'cac'
import { buildCommand } from './commands/build'
import { logger } from './utils/logger'
const cli = cac('mycelis')

cli.option('--debug', '显示调试信息')

buildCommand(cli)

cli.help()
cli.version('1.0.0')

try {
    cli.parse()
} catch (e: any) {
    logger.error(`命令执行失败: ${e.message}`)
    process.exit(1)
}