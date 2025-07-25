
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
    }),
});

export const {
    usePaymentInitiateMutation
} = paymentApi;

