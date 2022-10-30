import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlobEntity } from '../../../../modules/employees/upload/management/types.d';
import { RootState } from '../..';
import { State } from './types';

export const initialState: State = {};

export const filesSlice = createSlice({
  name: 'files',
  initialState: initialState,
  reducers: {
    addFiles: (
      state: State,
      action: PayloadAction<{ employeeId: string; blobs: IBlobEntity[] }>
    ) => {
      if (!state[action.payload.employeeId]) {
        state[action.payload.employeeId] = {};
      }

      action.payload.blobs.forEach((blob) => {
        state[action.payload.employeeId][blob.id] = blob;
      });
    },
    reset: <T>(state: T, action: PayloadAction<T>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { reset, addFiles } = filesSlice.actions;

export const selectFiles = (state: RootState): State => state.files;

export default filesSlice;
