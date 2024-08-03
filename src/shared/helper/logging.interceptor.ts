import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { loggerService } from '.';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const request: Request = context.switchToHttp().getRequest();
        const executionTime = Date.now() - start;
        loggerService
          .consoleLog()
          .warn(
            `${request.method}  ${request.originalUrl}  ${executionTime}ms`
          );
      })
    );
  }
}
