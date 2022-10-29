import { api } from '../../BaseAPI';

export const authAPI = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      Readonly<{ token: string; message?: string }>,
      { username: string; password: string }
    >({
      // override default endpoint
      queryFn: async (args, api): Promise<{ data: { token: string } }> => {
        const baseUrl = '/api';

        const response: { token: string } = await fetch(`${baseUrl}/login`, {
          body: JSON.stringify(args),
          method: 'POST',
        }).then((res) => res.json());

        const data = response;

        return {
          data,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authAPI;
