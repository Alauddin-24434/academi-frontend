import baseApi from "@/redux/api/baseApi";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getSessions: builder.query({
      query: () => '/sessions',
      providesTags: ['Session'],
    }),
  }),
});

export const {
useGetSessionsQuery
} = sessionApi;
