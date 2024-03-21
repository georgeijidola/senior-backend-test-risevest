import dotenv from 'dotenv'
import { ErrorResponse } from '../src/managers/error/ErrorResponse'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

let missingKeys: string[] = []

dotenv.config()

const keys = [
  // Server and http
  'PORT',
  'INTERFACE',
  'NODE_ENV',

  // Database
  'DB_HOST',
  'DB_DATABASE',
  'DB_TEST_DATABASE',
  'DB_USER',
  'DB_PASSWORD',
  'DB_PORT',

  // Redis
  'REDIS_HOST',
  'REDIS_PORT',

  // JWT
  'JWT_SECRET',
  'JWT_SECRET_EXPIRE',

  // Logger
  'LOG_LEVEL'
]

keys.forEach((key) => {
  !process.env[key] && missingKeys.push(key)
})

if (missingKeys.length >= 1) {
  const message = `${missingKeys.join(', ')} are missing and must be defined.`

  throw new ErrorResponse({ message })
}

const {
  PORT,
  INTERFACE,
  NODE_ENV,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_DATABASE,
  DB_TEST_DATABASE,
  REDIS_PORT,
  REDIS_HOST,
  JWT_SECRET,
  JWT_SECRET_EXPIRE,
  LOG_LEVEL
} = process.env

const config = {
  /**
   * API configs
   */
  api: {
    prefix: '/api/',
    port: parseInt(PORT!, 10),
    httpInterface: INTERFACE
  },

  environment: NODE_ENV,

  /**
   * Postgres
   */
  database: {
    host: DB_HOST!,
    user: DB_USER!,
    password: DB_PASSWORD!,
    port: parseInt(DB_PORT!, 10),
    name: NODE_ENV === 'test' ? DB_TEST_DATABASE : DB_DATABASE
  },

  /**
   * Redis
   */
  redis: {
    port: parseInt(REDIS_PORT!, 10)!,
    host: REDIS_HOST!
  },

  /**
   * JWT secret key and expiration
   */
  jwt: {
    secret: JWT_SECRET as string,
    secretExpire: JWT_SECRET_EXPIRE as string
  },

  /**
   * Used by winston logger
   */
  logs: {
    level: LOG_LEVEL || 'silly'
  }
}

export { config }
