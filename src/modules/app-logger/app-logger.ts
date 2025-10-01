import { Injectable, Scope, LoggerService } from '@nestjs/common';
import * as nestjsPino from 'nestjs-pino';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends nestjsPino.PinoLogger implements LoggerService {
  private customContext = '';

  constructor(params: nestjsPino.Params) {
    super(params);
  }

  setContext(context: string) {
    this.customContext = context;
    super.setContext(context);
  }

  private formatMessage(message: string) {
    return this.customContext ? `[${this.customContext}] ${message}` : message;
  }

  log(message: any, ...optionalParams: any[]) {
    super.info(this.formatMessage(message), ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(this.formatMessage(message), ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(this.formatMessage(message), ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(this.formatMessage(message), ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.info(this.formatMessage(message), ...optionalParams);
  }

  success(message: string, ...optionalParams: any[]) {
    super.info(this.formatMessage(`✅ ${message}`), ...optionalParams);
  }
}
