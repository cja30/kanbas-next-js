"use client";
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  modules: db.modules,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, { payload }) => {
      state.modules.push({
        _id: uuidv4(),
        name: payload.name,
        course: payload.course,
        lessons: [],
      });
    },
    deleteModule: (state, { payload }) => {
      state.modules = state.modules.filter((m) => m._id !== payload);
    },
    updateModule: (state, { payload }) => {
      state.modules = state.modules.map((m) =>
        m._id === payload._id ? payload : m
      );
    },
    editModule: (state, { payload }) => {
      state.modules = state.modules.map((m) =>
        m._id === payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
