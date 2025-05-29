import chalk from 'chalk'
import consola from 'consola'

export const logger = {
    info: (msg: string) => consola.info(chalk.blue(msg)),
    success: (msg: string) => consola.success(chalk.green(msg)),
    warn: (msg: string) => consola.warn(chalk.yellow(msg)),
    error: (msg: string) => consola.error(chalk.red(msg)),
    debug: (msg: string) => consola.debug(chalk.gray(msg))
}