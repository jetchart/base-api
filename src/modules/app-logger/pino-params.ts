import type { Params } from 'nestjs-pino/params';

const DEVELOPMENT_ENV_TRANSPORT = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname,context,req',
      levelFirst: true,
      translateTime: true
    }
  }
};

export const getPinoParams = (): Params => {
  return {
    pinoHttp: {
      autoLogging: false,
      ...((!process.env.NODE_ENV || process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'development') && DEVELOPMENT_ENV_TRANSPORT)
    }
  };
};