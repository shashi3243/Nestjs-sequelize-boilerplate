import { loggerService } from '../helper';
import { jsonToString } from '../utils';

export const loggerErrorMessage = (
  type: string,
  object: { error: unknown }
): void => {
  const error = jsonToString(object.error instanceof Error && object?.error);
  let message = '';
  switch (type) {
    case 'connection':
      message = `Database syncing error %s : ${error}`;
      break;
    case 'sync':
      message = `Database syncing error %s, error: ${error}`;
      break;
    case 'internal':
      message = `Send to email server, error: ${error}`;
      break;
    case 'stderr':
      message = `Seeder init error: ${jsonToString(object)}`;
      break;
    case 'redisConnection':
      message = `Redis Connecting error %s : ${error}`;
      break;
    default:
      message = `Internal error: ${error}`;
      break;
  }
  loggerService.logger('loggerError').error(new Error(message));
  loggerService.consoleLog().error(new Error(message));
};

//   // Function to log informational messages
export const loggerInfoMessage = (
  type: string,
  object: { error?: Error; port: number }
): void => {
  // const error = jsonToString(object?.error ?? object?.error?.message);
  let message = '';
  switch (type) {
    case 'connection':
      message = 'Database connected successfully';
      break;
    case 'sync':
      message = 'Database sync successfully';
      break;
    case 'listen':
      message = `Server is listening on ${object?.port}🚀`;
      break;
    case 'stdout':
      message = `All seeder migrated successfully`;
      break;
    case 'redisConnection':
      message = 'Redis connected successfully';
      break;
    default:
      message = `internal error: `;
      break;
  }
  loggerService.logger('loggerInfo').info(message);
  loggerService.consoleLog().info(message);
};
