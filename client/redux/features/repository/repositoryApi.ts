import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRepo: builder.mutation({
      query: (data) => ({
        url: 'repository',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
    }),
    removeRepo: builder.mutation({
      query: (id) => ({
        url: `repository/${id}`,
        method: 'DELETE',
        credentials: 'include' as const,
      }),
    }),
    getRepos: builder.query({
      query: () => ({
        url: 'repositories',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const { useAddRepoMutation, useGetReposQuery, useRemoveRepoMutation } =
  userApi;
