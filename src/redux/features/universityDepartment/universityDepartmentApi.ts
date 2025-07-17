import baseApi from "@/redux/api/baseApi";

const universityDepartmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        crateUniversityDepartment: builder.mutation({
            query: (data) => ({
                url: "/universityDepartments",
                method: "POST",
                body: data,
            })
            ,
            invalidatesTags: ["UniversityDepartment"]
        }),
        getUniversityDepartments: builder.query({
            query: () => ({
                url: "/universityDepartments",
                method: "GET",
            }),
            providesTags:["UniversityDepartment"]
        })
    })
})

export const { useCrateUniversityDepartmentMutation,useGetUniversityDepartmentsQuery} = universityDepartmentApi;