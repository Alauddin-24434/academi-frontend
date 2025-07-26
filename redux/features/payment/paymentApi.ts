
import baseApi from '@/redux/api/baseApi';

const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({



        paymentInitiate: build.mutation({
            query: (body) => ({
                url: '/payments/initiate',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Payment'],
        }),
        getPayments: build.query({
            query: () => ({
                url: '/payments',
                method: 'GET',
            }),
            providesTags: ['Payment'],
        }),
    }),
});

export const {
    usePaymentInitiateMutation,
    useGetPaymentsQuery
} = paymentApi;

