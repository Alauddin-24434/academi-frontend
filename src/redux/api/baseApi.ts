// src/redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { logout, updateToken } from "../features/auth/authSlice";
import { RootState } from "../store";
interface RefreshResponse {
  accessToken?: string;
  data?: {
    accessToken?: string;
  };
}

const mutex = new Mutex();

// Basic fetchBaseQuery configuration with base URL and credentials
const baseQuery = fetchBaseQuery({
  baseUrl:"http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const token = (getState() as RootState).auth.token;

    // If token exists, set it in the Authorization header
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// =========== Enhanced baseQuery with automatic token refresh logic ===========
const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  // Wait if another refresh token request is already in progress
  await mutex.waitForUnlock();

  // Execute the original base query
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401 Unauthorized error, try to refresh the token
  if (result?.error?.status === 401) {
    // If no refresh token request is running, acquire the mutex to start one
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Call the refresh token endpoint
        const refreshResult = await baseQuery(
          { url: "/users/refresh-token", method: "POST" },
          api,
          extraOptions,
        );

        // Extract the new access token from the refresh response
        const data = refreshResult.data as RefreshResponse;

        const newToken = data?.accessToken || data?.data?.accessToken;

        if (newToken) {
          api.dispatch(updateToken(newToken));
          result = await baseQuery(args, api, extraOptions);
        }

        if (newToken) {
          // Update the token in the Redux store
          api.dispatch(updateToken(newToken));

          // Retry the original query with the new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // If refresh fails, log the user out
          api.dispatch(logout());
        }
      } finally {
        // Release the mutex lock so other requests can continue
        release();
      }
    } else {
      // If another refresh request is already in progress, wait for it to finish
      await mutex.waitForUnlock();

      // Retry the original query after the token has been refreshed
      result = await baseQuery(args, api, extraOptions);
    }
  }

  // Return the final result (either original or retried)
  return result;
};

// =========== Create the RTK Query API slice ===========
const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth, // Use the enhanced baseQuery with reauth
  tagTypes: ["User", "University"], // Tags for cache invalidation
  endpoints: () => ({}), // Endpoints will be added here
});

export default baseApi;
