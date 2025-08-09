import { drizzle } from 'drizzle-orm/neon-http'
import { config } from 'dotenv'

config({ path: '.env' })

if (!process.env.DATABASE_URL) {
  throw new Error('issue with DATABASE-URL')
}

export const db = drizzle(process.env.DATABASE_URL!)
