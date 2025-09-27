import { DEFAULT_DATA_SOURCE_OPTIONS } from './config.common';

export const configuration = () => ({
  database: {
    ...DEFAULT_DATA_SOURCE_OPTIONS,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'nest_user',
    password: process.env.DB_PASSWORD || 'nest_pass',
    database: process.env.DB_DATABASE || 'nest_db',
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'THE_SECRET',
  },
  google: {
    clientId: "65738319816-84n4osqr38kdjhqdrr7q0a0id2d56gre.apps.googleusercontent.com"
  },
  nestport: parseInt(process.env.PORT || '3000'),
});
