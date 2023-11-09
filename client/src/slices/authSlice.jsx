import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setLogOut: (state, action) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export const { setLogOut, setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;