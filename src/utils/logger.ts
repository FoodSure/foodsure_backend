import kleur from 'kleur';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, printf, errors, timestamp } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  let coloredMessage = message;

  switch (level) {
    case 'error':
      coloredMessage = kleur.red(
        ` ${timestamp} [binaryvault] ${level}: ${stack || message} `,
      );
      break;
    case 'warn':
      coloredMessage = kleur.blue(
        ` ${timestamp} [binaryvault] ${level}: ${stack || message} `,
      );
      break;
    case 'info':
      coloredMessage = kleur.cyan(
        ` ${timestamp} [binaryvault] ${level}: ${stack || message} `,
      );
      break;
    default:
      coloredMessage = kleur.white(
        ` ${timestamp} [binaryvault] ${level}: ${stack || message} `,
      );
  }

  return coloredMessage;
});

const consoleLogFormat = printf(({ level, message, stack }) => {
  let coloredMessage = message;

  switch (level) {
    case 'error':
      coloredMessage = kleur.red(`[binaryvault] ${level}: ${stack || message}`);
      break;
    case 'warn':
      coloredMessage = kleur.blue(
        `[binaryvault] ${level}: ${stack || message}`,
      );
      break;
    case 'info':
      coloredMessage = kleur.cyan(
        `[binaryvault] ${level}: ${stack || message}`,
      );
      break;
    default:
      coloredMessage = kleur.white(
        `[binaryvault] ${level}: ${stack || message}`,
      );
  }

  return coloredMessage;
});

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), errors({ stack: true }), logFormat),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
    }),
    new transports.DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
    }),
  ],
  exceptionHandlers: [
    new transports.DailyRotateFile({
      filename: 'logs/exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
    }),
  ],
  rejectionHandlers: [
    new transports.DailyRotateFile({
      filename: 'logs/rejections-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
    }),
  ],
});

export default logger;
