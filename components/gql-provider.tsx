import { env } from '@/lib/env';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import type React from 'react';

export const GqlProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const client = new ApolloClient({
    uri: env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
