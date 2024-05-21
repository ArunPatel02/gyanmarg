import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../auth/authSlice';
import { BASE_URL } from '@/constants';
import toast from 'react-hot-toast';

const defaultHeaders = {};
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  credentials: 'include',
  headers: defaultHeaders,
  // prepareHeaders: (headers, { getState }) => {
  //   const token =
  //     getState().authStore.accessToken || localStorage.getItem('accessToken');
  //   headers.set('Token', process.env.REACT_APP_Token);
  //   headers.set('request_type', ROLES.user);
  //   if (token) headers.set('Authorization', `Bearer ${token}`);
  //   return headers;
  // },
});
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  const result: any = await baseQuery(args, api, extraOptions);
  console.log(result, 'result');
  if (result?.error?.status === 403) {
    //  send refresh token for new access token
  } else if (result?.error?.status === 401) {
    // window.location.href = `${BASE_URL}`;
  } else if (result?.error?.status === 400) {
    toast.error(result?.error?.data.message || 'Something went wrong');
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: 'refresh',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: 'me',
        method: 'GET',
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result, 'result');
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error, 'error i got');
        }
      },
    }),
  }),
  tagTypes: ['ALL_COURSES'],
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
