// admissionApi.ts
import baseApi from '@/redux/api/baseApi';

const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // POST: Create Student
    createStudent: build.mutation({
      query: (formData) => ({
        url: '/students',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Admission"],
    }),

    // GET: Get All Students
    getAllStudents: build.query({
      query: () => '/students', // ensure your backend route is '/students'
      providesTags: ["Admission"],
    }),

    // GET: Get Students by User ID
    getStudentByUserId: build.query({
      query: (userId) => `/students/${userId}`, // adjust URL based on your backend route
      providesTags: ["Admission"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetStudentByUserIdQuery, // 👈 exported hook
} = studentApi;
