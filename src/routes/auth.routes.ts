import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { loginController, registerController } from '../controllers/auth.controller'

const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/verify', { preHandler: [fastify.authenticate] }, async (req: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ user: req.user })
  })

  fastify.route({
    method: 'POST',
    url: '/register',
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 }
        },
        required: ['username', 'email', 'password']
      }
    },
    handler: async (req: FastifyRequest, reply: FastifyReply) => {
      return registerController(req, reply, fastify)
    }
  })

  fastify.route({
    method: 'POST',
    url: '/login',
    schema: {
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 }
        },
        required: ['email', 'password']
      },
      response: {
        200: {
          description: 'Successful login',
          type: 'object',
          properties: {
            token: { type: 'string' }
          }
        }
      }
    },
    handler: async (req: FastifyRequest, reply: FastifyReply) => {
      return loginController(req, reply, fastify)
    }
  })
}

export default authRoutes
