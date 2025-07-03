import baseApi from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (payload) => ({
        url: "/users/register",
        method: "POST",
        body: payload,
      }),
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/users/login",
        method: "POST",
        body: payload,
      }),
    }),

    getGoogleLoginUrl: builder.query({
      query: () => "/users/google/login",
    }),

    getGithubLoginUrl: builder.query({
      query: () => "/users/github/login",
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetGoogleLoginUrlQuery,
  useGetGithubLoginUrlQuery,
  useLazyGetGoogleLoginUrlQuery, // ✅ এইটা এখন ব্যবহার করবো
  useLazyGetGithubLoginUrlQuery, // ✅ এইটাও
} = authApi;
