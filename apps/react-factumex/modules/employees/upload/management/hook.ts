import { useContext } from 'react';
import { IUploadContext, UploadContext } from './context';

export const useUpload = (): IUploadContext => useContext(UploadContext);
