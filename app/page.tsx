'use client';

import { DatasetTable } from '@/components/dataset-table';
import { subtitle, title } from '@/components/primitives';
import { useStore } from '@/components/store';
import { AssetType } from '@/gql/graphql';

export default function Home() {
  const type = useStore((state) => state.type);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>
          Blockchain<span className={title({ color: 'violet' })}>AV</span>&nbsp;
        </h1>
        <h1 className={title()}>dataset&nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: 'mt-4' })}>
          Browse, download, and upload datasets
        </h2>
      </div>

      <div className="flex gap-3">
        <div className={type === AssetType.Pdf ? '' : 'hidden'}>
          <DatasetTable type={AssetType.Pdf} />
        </div>
        <div className={type === AssetType.Pe ? '' : 'hidden'}>
          <DatasetTable type={AssetType.Pe} />
        </div>
      </div>
    </section>
  );
}
