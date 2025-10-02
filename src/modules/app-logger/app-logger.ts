import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppLogger {
  constructor(private readonly pinoLogger: PinoLogger) {}

  logInfo(location: string, message: string, context?: any): void {
    this.pinoLogger.info({ location, ...context }, message);
  }

  logError(location: string, message: string, context?: any, error?: any): void {
    this.pinoLogger.error({ location, error, ...context }, message);
  }

  logWarn(location: string, message: string, context?: any): void {
    this.pinoLogger.warn({ location, ...context }, message);
  }
}
