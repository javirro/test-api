import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'

const swaggerPlugin: FastifyPluginAsync = fp(async (fastify) => {
  // Generate OpenAPI spec
  await fastify.register(import('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'My API',
        description: 'API documentation with Swagger + Fastify',
        version: '1.0.0'
      }
    }
  })

  // Serve Swagger UI
  await fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/docs', // available at http://localhost:3000/docs
    uiConfig: {
      docExpansion: 'list', // expand endpoints list by default
      deepLinking: false
    }
  })
})

export default swaggerPlugin
