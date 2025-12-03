"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { modules: [] };

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },

    updateModuleLocal: (state, action) => {
      const updated = action.payload;
      state.modules = state.modules.map((m) =>
        m._id === updated._id ? { ...m, ...updated } : m
      );
    },

    editModule: (state, action) => {
      const id = action.payload;
      state.modules = state.modules.map((m) =>
        m._id === id ? { ...m, editing: true } : { ...m, editing: false }
      );
    },
  },
});

export const { setModules, updateModuleLocal, editModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
