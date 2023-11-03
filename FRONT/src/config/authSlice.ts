import { createSlice } from "@reduxjs/toolkit";

export type AuthProps = {
  token: string;
};

const initialState: AuthProps = {
  token: "",
};

const authSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
