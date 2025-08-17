import fp from 'fastify-plugin'
import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import { Role } from '../types/user'

interface JwtPayload {
  email: string
  role: Role
  username: string
}

// Extend FastifyInstance with authenticate
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

// dinamic import for module @fastify/jwt. It will help to make difference between dev and prod environment
const jwtAuthPlugin: FastifyPluginAsync = fp(async (fastify) => {
  // Register fastify-jwt
  fastify.register(import('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || 'super-secret'
  })

  // Add authenticate decorator
  // jwtVerify reads the authorization header (expects Bearer <token>). Verifies the token using the previous secret.
  // If it is valid, decoded it and attaches the payload to req.user automatically.
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify<JwtPayload>()
    } catch (err) {
      reply.send(err)
    }
  })
})

export default jwtAuthPlugin
