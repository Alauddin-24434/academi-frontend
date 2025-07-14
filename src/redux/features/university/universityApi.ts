import baseApi from "@/redux/api/baseApi";

const universityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUniversity: builder.mutation({
      query: (data) => ({
        url: '/universities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['University'],
    }),

    getUniversities: builder.query({
      query: () => '/universities',
      providesTags: ['University'],
    }),
  }),
});

export const {
  useCreateUniversityMutation,
  useGetUniversitiesQuery,
} = universityApi;
