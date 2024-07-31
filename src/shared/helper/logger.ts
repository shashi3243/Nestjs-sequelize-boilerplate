import { format, transports } from 'winston';
import * as winston from 'winston';
import { addColors } from 'winston/lib/winston/config';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as path from 'path';

const LOGGER_MSG_COLORS = {
  error: 'bold red',
  warn: 'italic cyan',
  info: 'yellow',
  debug: 'magenta',
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
      filename: path.join(
        __dirname,
        `../../../src/shared/logs/%DATE%/${name}.log`
      ),
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
          colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.message}`)
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
