import Fastify, { FastifyInstance } from 'fastify'
import jwtAuthPlugin from './plugins/jwt.plugin'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import postgresPlugin from './plugins/postgres.plugin'

const fastify: FastifyInstance = Fastify({
  logger: true
})

fastify.register(postgresPlugin)

fastify.register(jwtAuthPlugin)

fastify.register(authRoutes, { prefix: '/auth' })
fastify.register(userRoutes, { prefix: '/user' })

export const startFastifyServer = async () => {
  try {
    await fastify.listen({ port: 3000 })
    fastify.log.info('Server listening on http://localhost:3000')
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}
