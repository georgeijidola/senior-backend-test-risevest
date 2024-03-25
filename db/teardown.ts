import { dropDatabase } from '.'
import { logger } from '../src/loaders/logger'

const teardown = async () => {
  try {
    await dropDatabase()

    process.exit(0)
  } catch (error) {
    logger.error('Database teardown failed:', error)
  }
}

teardown()
