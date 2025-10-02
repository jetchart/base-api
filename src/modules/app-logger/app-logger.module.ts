import { Module } from '@nestjs/common';
import { AppLogger } from './app-logger';
import { getPinoParams } from './pino-params';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [LoggerModule.forRoot(getPinoParams()),],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class AppLoggerModule {}
