// admissionApi.ts
import baseApi from '@/redux/api/baseApi';

const admissionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // POST: Create Admission
    createAdmission: build.mutation({
      query: (formData) => ({
        url: '/students',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags:["Admission"]
    }),

    // GET: Get All Admissions
    getAllAdmissions: build.query({
      query: () => '/admissions',
    }),
  }),
});

export  const {
  useCreateAdmissionMutation,
  useGetAllAdmissionsQuery,
} = admissionApi;
