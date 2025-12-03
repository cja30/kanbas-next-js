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
    },

    updateCourseLocal: (state, { payload }) => {
      state.courses = state.courses.map((course: any) =>
        course._id === payload._id ? payload : course
      );
    },
  },
});

export const {
  setCourses,
  setEditingCourse,
  clearEditingCourse,
  updateCourseLocal,  
} = coursesSlice.actions;

export default coursesSlice.reducer;

