"use client";
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";
import { v4 as uuidv4 } from "uuid";

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: {
    enrollments: [...db.enrollments],
    showAll: false,
  },

  reducers: {
    toggleShowAll: (state) => {
      state.showAll = !state.showAll;
    },

    enroll: (state, { payload }) => {
      const { user, course } = payload;

      const exists = state.enrollments.some(
        (e) => e.user === user && e.course === course
      );

      if (!exists) {
        state.enrollments.push({
          _id: uuidv4(),   
          user,
          course,
        });
      }
    },

    unenroll: (state, { payload }) => {
      const { user, course } = payload;

      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === user && e.course === course)
      );
    },
  },
});

export const { toggleShowAll, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
