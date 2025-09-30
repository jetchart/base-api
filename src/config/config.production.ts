import { DEFAULT_DATA_SOURCE_OPTIONS } from './config.common';

export const configuration = () => ({
  database: {
    type: 'postgres',
    url: 'postgresql://postgres:KGqdLPQSZurDRDDtFppLCtVfwViWLOaA@postgres.railway.internal:5432/railway',
    autoLoadEntities: true,
    logging: false,
    synchronize: false,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID
  },
  web: {
    host: process.env.WEB_HOST,
  },
  nestport: process.env.NEST_PORT,
});
