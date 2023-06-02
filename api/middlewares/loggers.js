/* c8 ignore start */
import winston from 'winston';
import * as expressWinston from 'express-winston';
import { __dirname } from '#utils/file.js';

export const requestLogger = expressWinston.logger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp()
  ),
  transports: [
    new winston.transports.File({
      filename: `${__dirname}/logs/app.log`,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.Console({
      format: winston.format.printf(
        ({
          level,
          message,
          meta: {
            res: { statusCode }
          },
          timestamp
        }) => {
          return `${timestamp} [${statusCode}] ${level}: ${message}`;
        }
      )
    })
  ]
});

export const errorLogger = expressWinston.errorLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: `${__dirname}/logs/error.log`,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});
/* c8 ignore end */
