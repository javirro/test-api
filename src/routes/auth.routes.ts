import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { LoginBody, loginController } from '../controllers/auth.controller'

const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/login', async (req: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
    return loginController(req, reply, fastify.jwt.sign)
  })
}

export default authRoutes
