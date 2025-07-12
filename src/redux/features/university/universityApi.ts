import baseApi from "@/redux/api/baseApi";
import { IUniversity } from "@/types/university";

const universityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUniversity: builder.mutation<IUniversity, Partial<IUniversity>>({
      query: (data) => ({
        url: '/universities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['University'],
    }),

    getUniversities: builder.query<IUniversity[], void>({
      query: () => '/universities',
      providesTags: ['University'],
    }),
  }),
});

export const {
  useCreateUniversityMutation,
  useGetUniversitiesQuery,
} = universityApi;
