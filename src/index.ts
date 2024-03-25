import { config } from '../config'
import { loaders } from './loaders'
import { logger } from './loaders/logger'

const startServer = async () => {
  const app = await loaders()

  const { port } = config.api

  app
    .listen(port, () => {
      logger.info(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️
      ################################################
    `)
    })
    .on('error', (error: Error) => {
      logger.error('Error starting server:', error)

      process.exitCode = 1
    })
}

startServer()

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

// Handle unhandled promise rejections
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error)

  process.exitCode = 1
})
