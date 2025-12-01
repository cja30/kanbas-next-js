"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  editingCourse: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload }) => {
      state.courses = payload;
    },

    setEditingCourse: (state, { payload }) => {
      state.editingCourse = payload;
    },

    clearEditingCourse: (state) => {
      state.editingCourse = null;
    }
  },
});

export const {
  setCourses,
  setEditingCourse,
  clearEditingCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
