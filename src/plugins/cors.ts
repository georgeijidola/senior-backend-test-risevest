import cors from '@fastify/cors'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

export default fp(async (instance: FastifyInstance) => {
  instance.register(cors)
})
