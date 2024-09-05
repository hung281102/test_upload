import { Button } from '@nextui-org/button';
import { NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Tab, Tabs } from '@nextui-org/tabs';

import { ArrowDownTray, ArrowUpTray } from '@/components/icons';
import { useStore } from '@/components/store';
import { ThemeSwitch } from '@/components/theme-switch';
import type { AssetType } from '@/gql/graphql';

export const NavbarActions = () => {
  const setUploadModalOpen = useStore((state) => state.setUploadModalOpen);
  const type = useStore((state) => state.type);
  const setType = useStore((state) => state.setType);
  const setDownloadModalOpen = useStore((state) => state.setDownloadModalOpen);

  return (
    <NavbarContent className="flex basis-full" justify="end">
      <NavbarItem>
        <ThemeSwitch />
      </NavbarItem>
      <NavbarItem>
        <Tabs
          aria-label="Types"
          selectedKey={type}
          onSelectionChange={(key) => setType(key as AssetType)}
        >
          <Tab key="PDF" title="PDF" />
          <Tab key="PE" title="PE" />
        </Tabs>
      </NavbarItem>
      <NavbarItem>
        <Button
          startContent={<ArrowUpTray />}
          variant="shadow"
          color="primary"
          onClick={() => setUploadModalOpen(true)}
        >
          Upload
        </Button>
      </NavbarItem>
      <NavbarItem>
        <Button
          startContent={<ArrowDownTray />}
          onClick={() => setDownloadModalOpen(true)}
        >
          Download
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};
