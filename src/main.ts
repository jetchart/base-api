import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from './modules/app-logger/app-logger';
import { AppLoggingInterceptor } from './modules/app-logger/app-logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = await app.resolve(AppLogger);

  app.useLogger(logger);
  app.useGlobalInterceptors(new AppLoggingInterceptor(logger));

  const configService = app.get<ConfigService>(ConfigService);
  const webHost = configService.get('web.host');
  const port = configService.get('nestport');

  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(port ?? 3000);
}
bootstrap();
