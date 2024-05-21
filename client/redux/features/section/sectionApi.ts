import { apiSlice } from '../api/apiSlice';

export const sectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSection: builder.mutation({
      query: ({ courseId, ...data }) => ({
        url: `courses/${courseId}/add-section`,
        method: 'POST',
        credentials: 'include' as const,
        body: data,
      }),
      invalidatesTags: ['ALL_COURSES'],
    }),
    updateSection: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `sections/${id}`,
        method: 'PUT',
        credentials: 'include' as const,
        body: data,
      }),
      invalidatesTags: ['ALL_COURSES'],
    }),
  }),
});

export const { useAddSectionMutation, useUpdateSectionMutation } = sectionApi;
