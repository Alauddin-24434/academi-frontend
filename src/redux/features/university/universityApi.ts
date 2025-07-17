import baseApi from "@/redux/api/baseApi";

const universityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUniversity: builder.mutation({
      query: (data) => ({
        url: "/universities",
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['University'],
    }),

    getUniversities: builder.query({
      query: (params) => {
        const queryParms = new URLSearchParams();
        if (params.searchTerm) {
          queryParms.append("searchTerm", params.searchTerm)
        }
        if (params.code) {
          queryParms.append("code", params.code)
        }
        if (params.location) {
          queryParms.append("location", params.location)
        }
        if (params.type) queryParms.append("type", params.type)
        if (params?.limit) queryParms.append('limit', params.limit);
        if (params?.page) queryParms.append('page', params.page);
        return {
          url: `/universities?${queryParms}`,
          method: "GET"
        }
      },
      providesTags:["University"]
    }),
  }),
});

export const {
  useCreateUniversityMutation,
  useGetUniversitiesQuery,
} = universityApi;
