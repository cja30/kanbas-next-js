"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },

    addModule: (state, action) => {
      state.modules.push(action.payload);
    },

    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },

    updateModule: (state, action) => {
      state.modules = state.modules.map((module) =>
        module._id === action.payload._id ? action.payload : module
      );
    },

    editModule: (state, action) => {
      state.modules = state.modules.map((module) =>
        module._id === action.payload
          ? { ...module, editing: true }
          : { ...module, editing: false }
      );
    },
  },
});

export const {
  addModule,
  deleteModule,
  updateModule,
  editModule,
  setModules,
} = modulesSlice.actions;

export default modulesSlice.reducer;
