// src/redux/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avater?: string;
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
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setCredentials(
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { updateToken, setUser, setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
