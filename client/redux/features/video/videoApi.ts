import { apiSlice } from '../api/apiSlice';

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: (id) => ({
        url: `videos/${id}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
      transformResponse: (response: any) => response.data,
    }),
    addVideo: builder.mutation({
      query: ({ sectionId, title }) => ({
        url: `sections/${sectionId}/add-video`,
        method: 'POST',
        credentials: 'include' as const,
        body: { title },
      }),
      invalidatesTags: ['ALL_COURSES'],
    }),
    updateVideo: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `videos/${id}`,
        method: 'PUT',
        credentials: 'include' as const,
        body: data,
      }),
      onQueryStarted: async ({ id, ...rest }, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          // @ts-ignore
          apiSlice.util.updateQueryData('getVideo', id, (draft) => {
            console.log('don', rest);
            return {
              ...draft,
              ...rest,
            };
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patch.undo();
        }
      },
    }),
    reorderVideos: builder.mutation({
      query: ({ id, data }) => ({
        url: `sections/${id}/reorder-videos`,
        method: 'PUT',
        credentials: 'include' as const,
        body: data,
      }),
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `videos/${id}`,
        method: 'DELETE',
        credentials: 'include' as const,
      }),
      invalidatesTags: ['ALL_COURSES'],
    }),
  }),
});

export const {
  useGetVideoQuery,
  useUpdateVideoMutation,
  useAddVideoMutation,
  useReorderVideosMutation,
  useDeleteVideoMutation,
} = videoApi;
