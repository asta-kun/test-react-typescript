import { APIResourceType } from './types.d';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { selectAuth } from '../store/auth/slice';

export const dynamicBaseQuery: (
  withLocation?: boolean
) => BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  (
    withLocation = true
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  (args, WebApi, extraOptions) => {
    // auth state
    const auth = selectAuth(WebApi.getState() as RootState);

    // generate base url
    const baseUrl = process.env['NEXT_PUBLIC_API_ENDPOINT'];

    // base instance
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: baseUrl,
      prepareHeaders: (headers, { getState }) => {
        // DISABLE, NOT API SUPPORT YET
        // if (auth.token) {
        //   headers.set('authorization', auth.token);
        // }

        return headers;
      },
    });
    return rawBaseQuery(args, WebApi, extraOptions);
  };

export const api = createApi({
  baseQuery: dynamicBaseQuery(true),
  tagTypes: [],
  endpoints: () => ({}),
});
