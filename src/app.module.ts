import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration as devConfiguration } from './config/config.development';
import { configuration as productionConfiguration } from './config/config.production';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './modules/auth/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './modules/app.controller';
import { AppService } from './modules/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: (() => {
        const env = process.env.NODE_ENV;
        if (env === 'production') return [productionConfiguration];
        if (env === 'staging') return [productionConfiguration];
        if (env === 'testing' || env === 'test') return [productionConfiguration];
        return [productionConfiguration];
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
