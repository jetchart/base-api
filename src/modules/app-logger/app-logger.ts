import { Injectable, LoggerService } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppLogger extends PinoLogger implements LoggerService {
  private format(context: string, message: any) {
    const prefix = context ? `[${context}] ` : '';
    if (typeof message === 'string') return `${prefix}${message}`;
    if (message instanceof Error) return `${prefix}${message.message}`;
    return `${prefix}${JSON.stringify(message)}`;
  }

  log(context: string, message: any, ...optionalParams: any[]) {
    super.info(this.format(context, message), ...optionalParams);
  }

  error(context: string, message: any, ...optionalParams: any[]) {
    super.error(this.format(context, message), ...optionalParams);
  }

  warn(context: string, message: any, ...optionalParams: any[]) {
    super.warn(this.format(context, message), ...optionalParams);
  }

  debug(context: string, message: any, ...optionalParams: any[]) {
    super.debug(this.format(context, message), ...optionalParams);
  }

  verbose(context: string, message: any, ...optionalParams: any[]) {
    super.info(this.format(context, message), ...optionalParams);
  }

  success(context: string, message: any, ...optionalParams: any[]) {
    super.info(this.format(context, `✅ ${message}`), ...optionalParams);
  }
}
