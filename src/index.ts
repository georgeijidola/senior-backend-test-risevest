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
    .on('error', (err: Error) => {
      logger.error(err)
    })
}

startServer()

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
  logger.error(error)
})

// Handle unhandled promise rejections
process.on('uncaughtException', (error: Error) => {
  logger.error(error)
})
