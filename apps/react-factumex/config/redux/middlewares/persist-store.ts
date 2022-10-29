import { RootState } from '../index';
import { Middleware } from '@reduxjs/toolkit';
import { setMany } from '../../indexedDB/basic-store';
import authSlice from '../store/auth/slice';

// slices that should be persisted
export const slices = [authSlice].map((slice) => ({
  slice,
  name: slice.name,
  key: `redux-state-${slice.name}`,
}));

const persistStoreMiddleware: Middleware =
  ({ getState }) =>
  (nextMiddleware) =>
  async (action) => {
    const result = nextMiddleware(action);

    const matched = slices.some(({ name }) =>
      action.type.startsWith(`${name}/`)
    );

    if (matched) {
      // persist state
      const state = getState() as RootState;
      const data = slices.map(({ name, key }) => [
        key,
        state[name],
      ]) as unknown as [string, unknown][];

      await setMany(data);
    }
    return result;
  };

export default persistStoreMiddleware;
