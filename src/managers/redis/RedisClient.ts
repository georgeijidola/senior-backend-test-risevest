import { createClient } from 'redis'
import { config } from '../../../config'
import { logger } from '../../loaders/logger'

const { port, host } = config.redis

const redisClient = async () => {
  const client = createClient({
    url: `redis://${host}:${port}`
  })

  client.on('error', (error) => {
    logger.error(`Redis client error: ${error}`)
  })

  await client.connect()

  return client
}

export { redisClient }
