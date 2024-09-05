'use client';

import { Link } from '@nextui-org/link';
import type React from 'react';

import { DownloadModal } from '@/components/download-modal';
import { GqlProvider } from '@/components/gql-provider';
import { Navbar } from '@/components/navbar';
import { UploadModal } from '@/components/upload-modal';
import { siteConfig } from '@/config/site';

export const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <GqlProvider>
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          {children}
        </main>
        <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href={siteConfig.links.explorer}
            title="hyperledger explorer"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">Hyperledger Fabric</p>
          </Link>
        </footer>
        <UploadModal />
        <DownloadModal />
      </div>
    </GqlProvider>
  );
};
