import { sequelize } from './dbConnection'
import { expressLoader } from './express'
import { logger } from './logger'

const loaders = async () => {
  const app = expressLoader()

  // Test the connection
  try {
    await sequelize.authenticate()
    logger.info('Sequelize connection to the database is authenticated.')
  } catch (error) {
    logger.error('Unable to authenticate to the database:', error)
  }

  logger.info('✌️ Express loaded')

  return app
}

export default loaders
