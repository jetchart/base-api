import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap, catchError } from 'rxjs';
import { Request } from 'express';
import { throwError } from 'rxjs';
import { AppLogger } from './app-logger';

@Injectable()
export class AppLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest<Request>();
    const { method, url } = request;

    this.logger.info(`➡️  ${method} ${url} - Incoming request`);

    return next.handle().pipe(
      tap(() => {
        const response = httpCtx.getResponse();
        const statusCode = response.statusCode;
        const ms = Date.now() - now;
        this.logger.info(`⬅️  ${method} ${url} - ${statusCode} [${ms}ms]`);
      }),
      catchError((err) => {
        const ms = Date.now() - now;
        this.logger.error(`❌ ${method} ${url} - Error after ${ms}ms`, err);
        return throwError(() => err);
      }),
    );
  }
}
