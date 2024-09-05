import { create } from 'zustand';

import { AssetType } from '@/gql/graphql';

interface Store {
  type: AssetType;
  setType: (type: AssetType) => void;
  uploadModalOpen: boolean;
  setUploadModalOpen: (open: boolean) => void;
  downloadModalOpen: boolean;
  setDownloadModalOpen: (open: boolean) => void;
}

export const useStore = create<Store>()((set) => ({
  type: AssetType.Pdf,
  setType: (type) =>
    set((state) => ({
      ...state,
      type,
    })),
  uploadModalOpen: false,
  setUploadModalOpen: (open) =>
    set((state) => ({
      ...state,
      uploadModalOpen: open,
    })),
  downloadModalOpen: false,
  setDownloadModalOpen: (open) =>
    set((state) => ({
      ...state,
      downloadModalOpen: open,
    })),
}));
