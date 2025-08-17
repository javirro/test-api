import { v4 as uuidv4 } from 'uuid';

CREATE TYPE USER_ROLE as ENUM ('user', 'admin');
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL UNIQUE,
  role USER_ROLE NOT NULL DEFAULT 'user',
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);