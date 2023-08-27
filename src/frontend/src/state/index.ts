import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your initial state
export interface AuthState {
  email: string | null;
  role: string | null;
  token: string | null;
}

const initialState: AuthState = {
  email: null,
  role: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ email: string; role: string; token: string }>
    ) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.email = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
