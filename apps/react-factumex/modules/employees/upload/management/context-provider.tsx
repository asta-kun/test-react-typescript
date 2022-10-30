import { useCallbackRef } from '@factumex/core/hooks';
import React, { ReactElement, useState } from 'react';
import UploadPanel from './containers/UploadPlanel';
import { UploadContext } from './context';
import { IBlobEntity } from './types.d';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { addFiles as addFilesAction } from '../../../../config/redux/store/files/slice';
import { useRouter } from 'next/router';
import useNavigation, { Page } from '../../../../hooks/use-navigation';
import toast from 'react-hot-toast';

const UploadContextProvider = (): ReactElement => {
  const {
    withEvents: { employees },
  } = useNavigation(Page.main);
  const [files, setFiles] = useState<Record<string, IBlobEntity>>({});
  const dispatch = useDispatch();
  const {
    query: { employeeId },
  } = useRouter();

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

  const confirm = useCallbackRef((): void => {
    // send to store (a middleware will save them on indexedDB)

    const blobs = Object.values(files).map((file) => ({
      ...file,
      blob: new Blob([file.blob], { type: file.blob.type }),
    }));

    dispatch(
      addFilesAction({
        employeeId: employeeId as string,
        blobs,
      })
    );

    // clear files
    setFiles({});

    toast.success('Files uploaded successfully');
    employees();
  });

  return (
    <UploadContext.Provider value={{ files, addFiles, removeFiles, confirm }}>
      <UploadPanel />
    </UploadContext.Provider>
  );
};

export default UploadContextProvider;
