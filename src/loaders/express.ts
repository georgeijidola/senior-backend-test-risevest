import { json, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import express from 'express'
import { preventSQLInjection } from '../api/middlewares/preventSQLInjection'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import { statusCodes } from '../managers/constants'
import { config } from '../../config'
import routes from '../api'
import { ErrorResponse } from '../managers/error/ErrorResponse'
import errorHandler from '../managers/error/errorHandler'

const { SUCCESS, NOT_FOUND } = statusCodes

const app = express()

// Useful if you're behind a reverse proxy (Heroku, AWS ELB, Nginx, etc)
// It shows the real origin IP in the heroku or Cloudwatch logs
app.set('trust proxy', 1)

// Alternate description:
// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors())

// Middleware that transforms the raw string of req.body into json
app.use(json())

// Sanitize data
app.use(preventSQLInjection)

// Set security headers
app.use(helmet())

// Rate limit for 10mins
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 30
})
app.use(limiter)

// Prevent HTTP Param Pollution
app.use(hpp())

app.get('/', (req: Request, res: Response): void => {
  res.status(SUCCESS).send('Welcome to Risevest Assessment API!')
})

/**
 * Health Check endpoints
 */
app.get('/status', (req, res) => {
  res.status(SUCCESS).end()
})

// Load API routes
app.use(config.api.prefix, routes)

// catch 404 and forward to error handler
app.use('*', (req: Request, res: Response): void => {
  throw new ErrorResponse({
    message: 'Resource not found.',
    statusCode: NOT_FOUND
  })
})

// error handlers
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const formattedError = errorHandler(error)

  return res.status(formattedError.statusCode!).json(formattedError)
})

export { app }
