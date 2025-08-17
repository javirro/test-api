import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"

const userRoutes: FastifyPluginAsync = async (fastify) => {



  fastify.get('/me', { preHandler: [fastify.authenticate], }, async (req: FastifyRequest, reply: FastifyReply) => {
    return { user: req.user }
  })
}

export default userRoutes