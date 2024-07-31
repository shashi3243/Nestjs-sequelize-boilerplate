import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import * as model from '../models';
import { commonMessage } from '../logMessage';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService): Promise<Sequelize> => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: configService.get<string>('db.dbHost'),
        port: configService.get<number>('db.dbPort'),
        username: configService.get<string>('db.dbUser'),
        password: configService.get<string>('db.dbPassword'),
        database: configService.get<string>('db.dbName'),
      });
      await sequelize
        .authenticate()
        .then(() => {
          commonMessage.loggerInfoMessage('connection', null);
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            commonMessage.loggerErrorMessage('connection', {
              error: err.message,
            });
          }
        });
      await sequelize.addModels(Object.values(model));
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
