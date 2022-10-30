import { useCallbackRef } from '@factumex/core/hooks';
import React, { ReactElement, useState } from 'react';
import UploadPanel from './containers/UploadPlanel';
import { UploadContext } from './context';
import { IBlobEntity } from './types.d';
import { v4 as uuid } from 'uuid';

const UploadContextProvider = (): ReactElement => {
  const [files, setFiles] = useState<Record<string, IBlobEntity>>({});

  const addFiles = useCallbackRef((newFiles: File[]) => {
    const nextFiles = newFiles.reduce(
      (acc, file) => {
        const id = uuid();
        acc[id] = { id, blob: file, name: file.name } as IBlobEntity;
        return acc;
      },
      { ...files } as typeof files
    );
    setFiles(nextFiles);

    return Object.keys(nextFiles);
  });

  const removeFiles = useCallbackRef((ids: string[]) => {
    const nextFiles = { ...files };
    ids.forEach((id) => delete nextFiles[id]);
    setFiles(nextFiles);
  });

  const confirm = useCallbackRef(async () => {
    alert('confirm');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  return (
    <UploadContext.Provider value={{ files, addFiles, removeFiles, confirm }}>
      <UploadPanel />
    </UploadContext.Provider>
  );
};

export default UploadContextProvider;
