import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration as devConfiguration } from '../config/config.development';
import { configuration as productionConfiguration } from '../config/config.production';
import { configuration as stagingConfiguration } from '../config/config.staging';
import { configuration as testingConfiguration } from '../config/config.testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { AppLoggerModule } from './app-logger/app-logger.module';

@Module({
  imports: [
     LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport: process.env.NODE_ENV !== 'production'
          ? {
              target: 'pino-pretty',
              options: { colorize: true },
            }
          : undefined,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: (() => {
        const env = process.env.NODE_ENV;
        if (env === 'production') return [productionConfiguration];
        if (env === 'staging') return [stagingConfiguration];
        if (env === 'testing' || env === 'test') return [testingConfiguration];
        return [devConfiguration];
      })(),
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions =>
        config.get<TypeOrmModuleOptions>('database')!,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    AppLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
