import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ErrorResponse } from './ErrorResponse'

const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const errorResponse = new ErrorResponse(error)

  request.log.error(errorResponse)

  const { message, statusCode } = errorResponse

  reply.status(statusCode).send({
    message
  })
}

export { errorHandler }
