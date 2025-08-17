import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()
const ALGORITHM = 'aes-256-cbc'

const ENCRYPT_IV = process.env.ENCRYPT_IV as string
const ENCRYPT_KEY = process.env.ENCRYPT_KEY as string

export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPT_KEY, 'base64'), Buffer.from(ENCRYPT_IV, 'hex'))

  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return encrypted
}

export const decrypt = (encryptedText: string): string => {
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPT_KEY, 'base64'), Buffer.from(ENCRYPT_IV, 'hex'))

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
