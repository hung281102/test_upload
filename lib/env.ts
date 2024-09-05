import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_IPFS__API_URL: z.string(),
    NEXT_PUBLIC_IPFS__GATEWAY_URL: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_IPFS__API_URL: process.env.NEXT_PUBLIC_IPFS__API_URL,
    NEXT_PUBLIC_IPFS__GATEWAY_URL: process.env.NEXT_PUBLIC_IPFS__GATEWAY_URL,
  },
});
