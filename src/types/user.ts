export type User = {
  id: string
  username: string
  email: string
  password: string
  role: Role
}

export type Role = 'user' | 'admin'