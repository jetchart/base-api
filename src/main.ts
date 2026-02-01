import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { AppLoggingInterceptor } from './modules/app-logger/interceptors/app-logger.interceptor';
import { HttpErrorFilter } from './filters/http-error.filter';
import { Logger } from 'nestjs-pino';
import type { AppConfiguration } from './config/configuration.interface';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalInterceptors(new AppLoggingInterceptor(logger));
  app.useGlobalFilters(new HttpErrorFilter(logger));

  const configService = app.get<ConfigService<AppConfiguration>>(ConfigService);
  const port = configService.get('nestport', { infer: true }) ?? 3000;
  const webHost = configService.get('web.host', { infer: true });

  app.enableCors({
    origin: webHost ?? false,
    credentials: true,
  });

  logger.log(`Application running on port ${port}`);
  await app.listen(port);
}
void bootstrap();
