import * as dotenv from 'dotenv';

dotenv.config()

export const PORT = process.env.PORT || 3000

export const secret = process.env.SECRET ?? ''

export const NODE_ENV = process.env.NODE_ENV || 'development';