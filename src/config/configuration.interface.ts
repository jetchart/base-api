import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface JwtConfig {
  secret: string;
}

export interface GoogleConfig {
  clientId: string;
}

export interface WebConfig {
  host: string;
}

export interface AppConfiguration {
  database: TypeOrmModuleOptions;
  jwt: JwtConfig;
  google: GoogleConfig;
  web: WebConfig;
  nestport: number;
}
