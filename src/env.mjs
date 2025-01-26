import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    JWT_SECRET: z.string().default('secret'),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().default('http://localhost:3333'),
  },
  runtimeEnv: {
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  }
})