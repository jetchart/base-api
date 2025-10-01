import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: false,
  });

  app.useLogger(app.get(Logger));

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
