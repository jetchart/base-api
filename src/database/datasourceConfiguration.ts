import { configuration as devConfiguration } from './../config/config.development';
import { configuration as productionConfiguration } from './../config/config.production';
import { configuration as stagingConfiguration } from './../config/config.staging';
import { configuration as testingConfiguration } from './../config/config.testing';
import * as process from 'node:process';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getDataSourceOptions =
  async (): Promise<PostgresConnectionOptions> => {
    let conf: any = devConfiguration();
    if (process.env.NODE_ENV == 'testing' || process.env.NODE_ENV == 'test') conf = testingConfiguration();
    if (process.env.NODE_ENV == 'staging') conf = stagingConfiguration();
    if (process.env.NODE_ENV == 'production') conf = productionConfiguration();
    const database = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await conf;
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const databaseConfig = await database();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return databaseConfig.database;
  };
