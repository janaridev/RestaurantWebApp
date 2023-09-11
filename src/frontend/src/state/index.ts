import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your initial state
export interface AuthState {
  id: string | null;
  email: string | null;
  role: string | null;
  token: string | null;
}

const initialState: AuthState = {
  id: null,
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
      action: PayloadAction<{
        id: string;
        email: string;
        role: string;
        token: string;
      }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.id = null;
      state.email = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
