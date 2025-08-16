import { FastifyReply, FastifyRequest } from 'fastify'

export interface LoginBody {
  username: string
  password: string
}

export const loginController = async (req: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply, jwtSign: (payload: object) => string) => {
  const { username, password } = req.body

  // Dummy authentication, replace with DB check
  if (username === 'admin' && password === '1234') {
    const token = jwtSign({ username })
    return { token }
  }

  return reply.code(401).send({ error: 'Invalid credentials' })
}
