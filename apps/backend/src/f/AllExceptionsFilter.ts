import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@mycelis/database';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '服务器内部错误';
    let data: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || '请求失败';
      } else {
        message = exceptionResponse;
      }
      data = exceptionResponse;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      message = this.translatePrismaError(exception);
      data = this.sanitizePrismaError(exception);
    }

    message = this.translateMessage(message);
    console.log(response);

    response.status(status).json({
      code: status,
      msg: message,
      data: data,
    });
  }

  private translateMessage(message: string): string {
    const translationMap: Record<string, string> = {
      'Bad Request': '请求参数错误',
      Unauthorized: '未经授权，请提供有效的凭证',
      'Not Found': '资源未找到',
      Forbidden: '禁止访问',
      'Not Acceptable': '请求不可接受',
      'Request Timeout': '请求超时',
      Conflict: '资源冲突',
      Gone: '资源已不存在',
      'HTTP Version Not Supported': 'HTTP 版本不受支持',
      'Payload Too Large': '请求体过大',
      'Unsupported Media Type': '不支持的媒体类型',
      'Unprocessable Entity': '无法处理的实体',
      'Internal Server Error': '服务器内部错误',
      'Not Implemented': '功能未实现',
      "I'm a teapot": '我是一个茶壶',
      'Method Not Allowed': '方法不允许',
      'Bad Gateway': '网关错误',
      'Service Unavailable': '服务不可用',
      'Gateway Timeout': '网关超时',
      'Precondition Failed': '前提条件失败',
    };
    return translationMap[message] || message;
  }

  private translatePrismaError(
    error: Prisma.PrismaClientKnownRequestError,
  ): string {
    const prismaErrorMap: Record<string, string> = {
      P1000: '数据库认证失败，请检查数据库凭据',
      P1001: '无法连接数据库服务器，请确保数据库服务器正在运行',
      P1002: '连接数据库服务器超时，请重试',
      P1003: '数据库不存在',
      P1008: '操作超时',
      P1009: '数据库已存在',
      P1010: '用户被拒绝访问数据库',
      P1011: 'TLS连接错误',
      P1012: 'Prisma模型定义错误',
      P1013: '数据库连接字符串无效',
      P1014: '模型的基础类型不存在',
      P1015: '数据库版本不支持的功能',
      P1016: '原始查询参数数量不正确',
      P1017: '服务器已关闭连接',
      P2000: '字段值过长',
      P2001: '查询的记录不存在',
      P2002: '唯一性约束冲突',
      P2003: '外键约束失败',
      P2004: '数据库约束失败',
      P2005: '字段值无效',
      P2006: '提供的字段值无效',
      P2007: '数据验证错误',
      P2008: '查询解析失败',
      P2009: '查询验证失败',
      P2010: '原始查询失败',
      P2011: '空值约束冲突',
      P2012: '缺少必需的字段',
      P2013: '缺少必需的参数',
      P2014: '违反关系约束',
      P2015: '找不到相关记录',
      P2016: '查询解释错误',
      P2017: '关系记录未连接',
      P2018: '未找到必需的关联记录',
      P2019: '输入错误',
      P2020: '值超出范围',
      P2021: '表不存在',
      P2022: '列不存在',
      P2023: '列数据不一致',
      P2024: '连接池超时',
      P2025: '操作失败，依赖的记录未找到',
      P2026: '数据库不支持此功能',
      P2027: '查询执行期间多个错误',
      P2028: '事务API错误',
      P2029: '超出查询参数限制',
      P2030: '找不到全文索引',
      P2031: 'MongoDB需要副本集',
      P2033: '数字超出64位整数范围',
      P2034: '事务失败，请重试',
      P2035: '数据库断言冲突',
      P2036: '外部连接器错误',
      P2037: '数据库连接过多',
      P3000: '无法创建数据库',
      P3001: '迁移可能导致数据丢失',
      P3002: '迁移已回滚',
      P3003: '迁移格式已更改',
      P3004: '系统数据库不应被修改',
      P3005: '数据库架构不为空',
      P3006: '迁移无法应用于影子数据库',
      P3007: '预览功能不被允许',
      P3008: '迁移已标记为已应用',
      P3009: '发现失败的迁移',
      P3010: '迁移名称过长',
      P3011: '迁移无法回滚',
      P3012: '迁移未处于失败状态',
      P3013: '不再支持多数据源提供程序',
      P3014: '无法创建影子数据库',
      P3015: '找不到迁移文件',
      P3016: '数据库重置失败',
      P3017: '找不到迁移',
      P3018: '迁移应用失败',
      P3019: '数据源提供程序不匹配',
      P3020: 'Azure SQL禁用影子数据库自动创建',
      P3021: '无法创建外键',
      P3022: '禁用直接执行DDL',
      P4000: '内省无法生成架构文件',
      P4001: '数据库为空',
      P4002: '数据库架构不一致',
    };

    if (error.code === 'P2002') {
      const meta = error.meta as { target?: string[] };
      const target = meta?.target?.[0] || '字段';
      return `数据库中已存在相同的${target}值`;
    }

    if (error.code === 'P2003') {
      const meta = error.meta as { field_name?: string };
      return `外键约束失败: ${meta?.field_name || '未知字段'}`;
    }

    return prismaErrorMap[error.code] || error.message || '数据库操作错误';
  }

  private sanitizePrismaError(
    error: Prisma.PrismaClientKnownRequestError,
  ): any {
    return {
      code: error.code,
      meta: error.meta,
    };
  }
}
