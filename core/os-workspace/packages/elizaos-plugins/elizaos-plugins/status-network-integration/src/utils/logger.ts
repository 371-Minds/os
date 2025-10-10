import * as winston from 'winston';

// Create logger instance for Status Network integration
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'status-network-integration' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
          return `${timestamp} [${level}]: ${message} ${metaStr}`;
        })
      )
    }),
    // Log errors to file
    new winston.transports.File({ 
      filename: 'logs/status-network-errors.log', 
      level: 'error' 
    }),
    // Log all to combined file
    new winston.transports.File({ 
      filename: 'logs/status-network-combined.log' 
    })
  ]
});

export default logger;
