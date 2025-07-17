import baseApi from "@/redux/api/baseApi";


const overViewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOverviews: builder.query({
            query: () => ({
                url: "/overviews",
                method: "GET"
            })
            
        })

    })
})

export const {useGetOverviewsQuery}= overViewApi;
