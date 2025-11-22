"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, signOut } = accountSlice.actions;
export default accountSlice.reducer;
