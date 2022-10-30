import { createContext } from 'react';
import { IBlobEntity } from './types.d';

export type IUploadContext = {
  addFiles: (files: File[]) => string[];
  removeFiles: (ids: string[]) => void;
  confirm: () => void;
  files: Readonly<Record<string, IBlobEntity>>;
};

export const UploadContext = createContext<IUploadContext>({
  files: {},
  addFiles: () => [],
  removeFiles: () => {
    // do nothing
  },
  confirm: () => {
    // do nothing
  },
});
