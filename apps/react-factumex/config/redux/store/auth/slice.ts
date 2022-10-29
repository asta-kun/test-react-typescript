import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { State } from './types.d';

export const initialState: State = {
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state: State, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    reset: <T>(state: T, action: PayloadAction<T>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setToken, reset } = authSlice.actions;

export const selectAuth = (state: RootState): State => state.auth;

export default authSlice;
