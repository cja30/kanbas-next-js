"use client";
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: {
    enrollments: db.enrollments,
    showAll: false,
  },
  reducers: {
    toggleShowAll: (state) => {
      state.showAll = !state.showAll;
    },

    enroll: (state, { payload }) => {
      const { user, course } = payload;
      if (!state.enrollments.some((e) => e.user === user && e.course === course)) {
        state.enrollments.push({ user, course });
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
