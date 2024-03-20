import redis from '@fastify/redis'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { config } from '../../config'

const { host, port } = config.redis

export default fp(async (instance: FastifyInstance) => {
  await instance.register(redis, {
    host,
    port
  })
})
