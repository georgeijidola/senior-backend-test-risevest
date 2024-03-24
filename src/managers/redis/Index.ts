import { redisClient } from './redisClient'

const redisHandler = async () => {
  const redis = await redisClient()
  const expiry = 72 * 60 * 60

  return {
    set: async ({
      key,
      value,
      EX = expiry
    }: {
      key: string
      value: string
      EX?: number
    }) =>
      await redis.set(key, value, {
        EX
      }),
    get: async (key: string) => await redis.get(key),
    del: async (key: string) => await redis.del(key),
    quit: async () => await redis.quit()
  }
}

export { redisHandler }
