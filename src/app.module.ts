import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration as devConfiguration } from './config/config.development';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: (() => {
        const env = process.env.NODE_ENV;
        if (env === 'production') return [devConfiguration];
        if (env === 'staging') return [devConfiguration];
        if (env === 'testing' || env === 'test') return [devConfiguration];
        return [devConfiguration];
      })(),
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions =>
        config.get<TypeOrmModuleOptions>('database')!,
    }),
  ],
})
export class AppModule {}
