import baseApi from "@/redux/api/baseApi";

const applicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createApplication: builder.mutation({
            query: (data) => ({
                url: "/applications",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Application"]
        }),
        getApplication: builder.query({
            query: () => {
                return {
                    url: `/applications`,
                    method: "GET",
                }
            }
        })
    })
})

export const {useCreateApplicationMutation,useGetApplicationQuery}=applicationApi;