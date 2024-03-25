import winston from 'winston'

// Conditional assignment for transports
const transports =
  process.env.NODE_ENV && process.env.NODE_ENV.includes('test')
    ? new winston.transports.Console()
    : new winston.transports.Console({
        format: winston.format.combine(
          winston.format.cli(),
          winston.format.splat()
        )
      })

const { combine, timestamp, errors, splat, json, prettyPrint, colorize } =
  winston.format

// Logger configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels: winston.config.npm.levels,
  format: combine(
    // Define log format
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    splat(),
    json(),
    prettyPrint(),
    colorize()
  ),
  transports
})

export { logger }
