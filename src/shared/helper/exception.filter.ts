import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UtilService } from '../utils/util.service';
import { loggerService } from './logger';

const { getErrorString } = new UtilService();

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();
    const statusCode: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message: string =
      statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'Internal server error'
        : exception.message;
    loggerService
      .consoleLog()
      .warn(
        `${request.method} ${request.originalUrl} ${statusCode} ${message}`
      );
    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      return response.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error: getErrorString(exception.stack),
      });
    }
    return response.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  }
}
