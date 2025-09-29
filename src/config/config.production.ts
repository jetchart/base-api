import { DEFAULT_DATA_SOURCE_OPTIONS } from './config.common';

export const configuration = () => ({
  database: {
    ...DEFAULT_DATA_SOURCE_OPTIONS,
    host: process.env.DB_HOST || 'postgresql://postgres:bmxUtMuOvMdPDmQCrJkvlmWoSrbgLkVf@postgres.railway.internal:5432/railway',
    synchronize: true,
    autoLoadEntities: true,
    logging: false,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'THE_SECRET',
  },
  google: {
    clientId: "65738319816-84n4osqr38kdjhqdrr7q0a0id2d56gre.apps.googleusercontent.com"
  },
  web: {
    host: 'http://localhost:5173',
  },
  nestport: 3000,
});
