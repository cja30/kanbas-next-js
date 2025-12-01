import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [], 
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload.map((e: any) => e.course);
    },

    enrollLocal: (state, { payload }) => {
      state.enrollments.push(payload.course);
    },

    unenrollLocal: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (courseId) => courseId !== payload
      );
    },
  },
});

export const {
  setEnrollments,
  enrollLocal,
  unenrollLocal,
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
