// auth.config.ts
import { defineConfig } from 'better-auth/config'

export default defineConfig({
  adapter: 'drizzle',
  provider: 'pg',
  schemaPath: './src/lib/auth.ts', // adjust if needed
})
