import AutoLoad from '@fastify/autoload'
import { FastifyInstance } from 'fastify'
import path from 'path'
import { errorHandler } from '../managers/error/errorHandler'

export default () => async (instance: FastifyInstance) => {
  // Register 404 handler
  instance.setNotFoundHandler((request, reply) => {
    const { method, url } = request

    const message = 'Route not found.'

    instance.log.error({ err: { url, method } }, message)

    reply.notFound(message)
  })

  // Load plugins
  await instance.register(AutoLoad, {
    dir: path.join(__dirname, '..', 'plugins'),
    ignorePattern: /\.test?\.(ts|js)/
  })

  // Load routes
  instance.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    ignorePattern: /\.test?\.(ts|js)/
  })

  instance.setErrorHandler(errorHandler)
}
