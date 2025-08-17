import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'

// Extend types
declare module 'fastify' {
  interface FastifyInstance {
    db: {
      query: (query: string, params?: any[]) => Promise<any>
    }
  }
}

const postgresPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(import('@fastify/postgres'), {
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/devDB'
  })

  // Create a shortcut
  fastify.decorate('db', {
    query: fastify.pg.pool.query.bind(fastify.pg.pool)
  })
})

export default postgresPlugin
