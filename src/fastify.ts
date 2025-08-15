import Fastify, {FastifyInstance } from "fastify"

const fastify: FastifyInstance = Fastify({
  logger: true
});


export const startFastifyServer = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info("Server listening on http://localhost:3000");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}
