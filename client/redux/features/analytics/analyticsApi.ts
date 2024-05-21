import { apiSlice } from '../api/apiSlice';

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardInfo: builder.query({
      query: () => ({
        url: 'dashboard',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getCoursesAnalytics: builder.query({
      query: () => ({
        url: 'get-courses-analytics',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getUsersAnalytics: builder.query({
      query: () => ({
        url: 'get-users-analytics',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getOrdersAnalytics: builder.query({
      query: () => ({
        url: 'get-orders-analytics',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const {
  useGetCoursesAnalyticsQuery,
  useGetUsersAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
  useGetDashboardInfoQuery,
} = analyticsApi;
