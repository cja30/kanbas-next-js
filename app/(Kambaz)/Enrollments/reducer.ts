import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [], 
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload.map((e: any) =>
        e.course.toString().toLowerCase().trim()
      );
    },

    enrollLocal: (state, { payload }) => {
      const courseId = payload.course.toString().toLowerCase().trim();
      if (!state.enrollments.includes(courseId)) {
        state.enrollments.push(courseId);
      }
    },

    unenrollLocal: (state, { payload }) => {
      const courseId = payload.toString().toLowerCase().trim();
      state.enrollments = state.enrollments.filter(
        (id: string) => id !== courseId
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
