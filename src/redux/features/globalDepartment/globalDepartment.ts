import baseApi from "@/redux/api/baseApi";

const globalDepartmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        crateGlobalDepartment: builder.mutation({
            query: (data) => ({
                url: "/globalDepartments",
                method: "POST",
                body: data,
            })
            ,
            invalidatesTags: ["GlobalDepartment"]
        }),
        getGlobalDepartments: builder.query({
            query: () => ({
                url: "/globalDepartments",
                method: "GET",
            }),
            providesTags: ["GlobalDepartment"]
        })
    })
})

export const { useCrateGlobalDepartmentMutation, useGetGlobalDepartmentsQuery } = globalDepartmentApi;