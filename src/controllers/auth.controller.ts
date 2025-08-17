import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { encrypt } from '../utils/encryptHelper'
import { User } from '../types/user'

export const loginController = async (req: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) => {
  try {
    const { email, password } = req.body as { email: string; password: string }

    const encryptPassword = encrypt(password)
    const user = await fastify.db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, encryptPassword])
    if (user.rowCount > 0) {
      const userData = user.rows[0] as User
      const token = fastify.jwt.sign({ email: userData.email, role: userData.role, username: userData.username })
      return { token }
    }
    return reply.code(401).send({ error: 'Invalid credentials' })
  } catch (error) {
    console.error('Error during login:', (error as Error).message)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
}

export const registerController = async (req: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) => {
  try {
    const { username, email, password } = req.body as { username: string; email: string; password: string }
    const encryptedPassword = encrypt(password)
    const result = await fastify.db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, encryptedPassword])
    const user = result.rows[0]
    return reply.status(201).send({
      email: user.email,
      username: user.username,
      role: user.role
    })
  } catch (error) {
    console.error('Error registering user:', (error as Error).message)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
}
