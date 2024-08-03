import { format, transports, addColors } from 'winston';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { UtilService } from '../utils/util.service';

const { resolveSrcPath } = new UtilService();

const LOGGER_MSG_COLORS = {
  error: 'bold red',
  warn: 'green',
  info: 'yellow',
};

addColors(LOGGER_MSG_COLORS);
const colorizer = format.colorize();
const datePattern = 'YYYY-MM-DD';
// Function to create a logger instance
function createLogger(
  transport: (transports.ConsoleTransportInstance | DailyRotateFile)[],
  level: string | undefined
) {
  return winston.createLogger({
    level: level || 'info',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
    transports: transport,
  });
}

// Function to create a daily rotating logger
function dailyLogger(object: { name: string }) {
  const { name } = object;
  const transport = [
    new DailyRotateFile({
      filename: `${resolveSrcPath('shared', 'logs')}/%DATE%/${name}.log`,
      datePattern,
      maxFiles: '5d',
    }),
  ];
  return createLogger(transport, 'info');
}

function consoleLogger() {
  const transport = [
    new transports.Console({
      format: format.combine(
        format.printf((msg) =>
          colorizer.colorize(
            msg.level,
            `${new Date().toLocaleString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })} | ${msg.message}`
          )
        )
      ),
    }),
  ];
  return createLogger(transport, 'info');
}
export const loggerService = {
  logger: (data: string): winston.Logger => dailyLogger({ name: data }),
  consoleLog: (): winston.Logger => consoleLogger(),
};
