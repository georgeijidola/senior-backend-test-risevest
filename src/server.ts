import { fastify as Fastify, FastifyInstance } from 'fastify'

import api from './api'
import { config } from '../config'

const { httpInterface, port } = config.api
const environment: string = config.environment

export const build = () => {
  const envToLogger = {
    development: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          colorizeObjects: true,
          translateTime: 'HH:MM:ss'
        }
      }
    },
    test: false
  }

  // Instantiate Fastify
  const server: FastifyInstance = Fastify({
    ajv: {
      customOptions: {
        strict: false
      }
    },
    logger: envToLogger[environment] ?? true // defaults to true if no entry matches in the map
  })

  server.addHook('onClose', async (instance) => {
    // Handle any shutdown events

    instance.log.info('Server is shutting down. Cleanup completed.')
  })

  // Register the API scaffolding plugin.
  server.register(api())

  return server
}

export const start = async (
  server: FastifyInstance
): Promise<FastifyInstance> => {
  try {
    await server.listen({ port: port, host: httpInterface })
  } catch (err) {
    if (err) {
      server.log.error({ err }, 'Server startup error')
      process.exit(1)
    }
  }

  return server
}

export default (): Promise<FastifyInstance> => {
  return start(build())
}
