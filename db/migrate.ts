import { migrator } from '.'
import { logger } from '../src/loaders/logger'

const migrate = async () => {
  try {
    const action = process.argv[2]

    if (!['up', 'down'].includes(action)) {
      logger.info("Invalid migration argument. Please specify 'up' or 'down'.")
      process.exitCode = 1
      return
    }

    action === 'up' ? await migrator.up() : await migrator.down({ to: 0 })

    logger.info('Migration done.')

    process.exitCode = 0
  } catch (error) {
    logger.error('Migration failed:', error)
    process.exitCode = 1
  }
}

migrate()
