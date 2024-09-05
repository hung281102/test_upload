import { create } from 'kubo-rpc-client';

import { env } from '@/lib/env';

export const ipfs = create({
  url: env.NEXT_PUBLIC_IPFS__API_URL,
});

export const getIpfsGatewayUrl = (cid: string, filename?: string) =>
  new URL(`/ipfs/${cid}`, env.NEXT_PUBLIC_IPFS__GATEWAY_URL).toString() +
  (filename ? `?filename=${filename}` : '');
