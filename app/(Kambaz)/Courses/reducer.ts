"use client";

import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: [...db.courses],
  editingCourse: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setEditingCourse: (state, { payload }) => {
      state.editingCourse = payload;
    },

    addCourse: (state, { payload }) => {
      const newCourse = {
        _id: uuidv4(),
        name: payload.name,
        description: payload.description,
        image: "/images/reactjs.jpg",
      };
      state.courses.push(newCourse);
      state.editingCourse = null;
    },

    updateCourse: (state, { payload }) => {
      if (payload._id === "new") return;

      state.courses = state.courses.map((c) =>
        c._id === payload._id ? payload : c
      );

      state.editingCourse = null;
    },

    deleteCourse: (state, { payload }) => {
      state.courses = state.courses.filter((c) => c._id !== payload);
    },
  },
});

export const {
  setEditingCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
