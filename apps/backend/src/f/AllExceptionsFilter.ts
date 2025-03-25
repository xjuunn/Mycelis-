import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch() // 不传递参数，捕获所有异常
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = '服务器内部错误';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            // 处理 NestJS 默认的异常响应
            if (typeof exceptionResponse === 'object') {
                message = (exceptionResponse as any).message || '请求失败';
            } else {
                message = exceptionResponse as string;
            }
        }

        // 将 message 转换为中文
        message = this.translateMessage(message);

        // 返回统一格式的响应
        response.status(status).json({
            code: status, // 返回对应的状态码
            msg: message,
            data: message,
        });
    }

    private translateMessage(message: string): string {
        // 定义异常消息的中文映射
        const translationMap: Record<string, string> = {
            'Bad Request': '请求参数错误',
            'Unauthorized': '未经授权，请提供有效的凭证',
            'Not Found': '资源未找到',
            'Forbidden': '禁止访问',
            'Not Acceptable': '请求不可接受',
            'Request Timeout': '请求超时',
            'Conflict': '资源冲突',
            'Gone': '资源已不存在',
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

        // 返回翻译后的消息，如果没有匹配则返回原消息
        return translationMap[message] || message;
    }
}