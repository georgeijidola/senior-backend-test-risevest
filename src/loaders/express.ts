import express, { json, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import { ErrorResponse } from '../managers/error/ErrorResponse'
import errorHandler from '../managers/error/errorHandler'
import { preventSQLInjection } from '../api/middlewares/preventSQLInjection'
import routes from '../api'
import { config } from '../../config'
import { statusCodes } from '../managers/constants'

const { SUCCESS, NOT_FOUND } = statusCodes
const { prefix } = config.api

const app = express()

// Trust proxy
app.set('trust proxy', 1)

// Enable CORS
app.use(cors())

// Parse JSON request bodies
app.use(json())

// Sanitize data to prevent SQL injection
app.use(preventSQLInjection)

// Set security headers
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30
})
app.use(limiter)

// Prevent HTTP Parameter Pollution
app.use(hpp())

// Health Check
app.get('/', (req: Request, res: Response): void => {
  res.status(SUCCESS).send('Welcome to Risevest Assessment API!')
})

// Health Check endpoint
app.get('/status', (req: Request, res: Response) => {
  res.status(SUCCESS).end()
})

// API routes
app.use(prefix, routes)

// Handle 404 errors
app.use('*', (req: Request, res: Response): void => {
  throw new ErrorResponse({
    message: 'Resource not found.',
    statusCode: NOT_FOUND
  })
})

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const formattedError = errorHandler(error)
  res.status(formattedError.statusCode!).json(formattedError)
})

export { app }
