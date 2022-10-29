import {
  Action,
  AnyAction,
  configureStore,
  Dispatch,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './api/BaseAPI';
import { isProduction } from '@factumex/core/config';
import authSlice from './store/auth/slice';
import i18nSlice from './store/i18n/slice';
import persistStoreMiddleware from './middlewares/persist-store';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
    i18n: i18nSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      api.middleware,
      persistStoreMiddleware
    ),
  devTools: !isProduction,
  preloadedState: {},
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = (): ThunkDispatch<unknown, undefined, AnyAction> &
  Dispatch<AnyAction> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
