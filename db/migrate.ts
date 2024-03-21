import { migrator } from '.'
import { logger } from '../src/loaders/logger'

const migrate = async () => {
  try {
    const action = process.argv[2]

    !['up', 'down'].includes(action) &&
      logger.info("Invalid migration argument. Do you mean 'up' or 'down'?")

    action === 'up' ? await migrator.up() : await migrator.down({ to: 0 })

    logger.info('Migration done.')

    process.exitCode = 0
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
}

export default migrate()
