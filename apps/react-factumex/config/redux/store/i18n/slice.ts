import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultLocale, Locale } from '../../../i18n/settings';
import { RootState } from '../..';
import { State } from './types.d';

export const initialState: State = {
  locale: defaultLocale,
};

export const slice = createSlice({
  name: 'i18n',
  initialState: initialState,
  reducers: {
    setLocale: (state: State, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
    reset: <T>(state: T, action: PayloadAction<T>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setLocale, reset } = slice.actions;

export const selectI18n = (state: RootState): State => state.i18n;

export default slice;
