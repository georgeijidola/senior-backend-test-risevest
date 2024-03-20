import expressLoader from './express'
import { logger } from './logger'

const loaders = async () => {
  const app = expressLoader()

  logger.info('✌️ Express loaded')

  return app
}

export default loaders
