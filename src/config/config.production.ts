import { DEFAULT_DATA_SOURCE_OPTIONS } from './config.common';

export const configuration = () => ({
  database: {
    ...DEFAULT_DATA_SOURCE_OPTIONS,
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    logging: false,
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
