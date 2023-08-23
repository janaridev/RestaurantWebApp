import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your initial state
interface AuthState {
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  email: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ email: string; token: string }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
