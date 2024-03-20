import winston from 'winston'

let transports

if ('test'.includes(process.env.NODE_ENV!)) {
  transports = new winston.transports.Console()
} else {
  transports = new winston.transports.Console({
    format: winston.format.combine(winston.format.cli(), winston.format.splat())
  })
}

const { combine, timestamp, errors, splat, json, prettyPrint, colorize } =
  winston.format

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL!,
  levels: winston.config.npm.levels,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    errors({ stack: true }),
    splat(),
    json(),
    prettyPrint(),
    colorize()
  ),
  transports
})

export { logger }
