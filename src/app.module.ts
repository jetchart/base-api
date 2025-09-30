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
        if (env === 'staging') return [devConfiguration];
        if (env === 'testing' || env === 'test') return [devConfiguration];
        return [devConfiguration];
      })(),
      expandVariables: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:KGqdLPQSZurDRDDtFppLCtVfwViWLOaA@switchback.proxy.rlwy.net:44103/railway',
      autoLoadEntities: true,
      logging: false,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
