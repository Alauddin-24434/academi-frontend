// src/redux/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string; // e.g., 'student', 'teacher', 'admin'
  image?: string; // Optional field for user profile image
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Token আপডেট করার জন্য
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    // User আপডেট করার জন্য (login বা অন্য কোনো সময়)
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },

    // Token এবং User একসাথে সেট করার জন্য (login এর সময়)
    setCredentials(
      state,
      action: PayloadAction<{ token: string; user: User }>,
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    // Logout করার জন্য: token আর user দুটোই রিসেট করবে
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { updateToken, setUser, setCredentials, logout } =
  authSlice.actions;

export default authSlice.reducer;
