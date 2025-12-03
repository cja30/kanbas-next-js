import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload.map((course: any) =>
        course._id.toLowerCase().trim()
      );
    },

    enrollLocal: (state, { payload }) => {
      const courseId =
        typeof payload === "string"
          ? payload.toLowerCase().trim()
          : payload._id.toLowerCase().trim();

      if (!state.enrollments.includes(courseId)) {
        state.enrollments.push(courseId);
      }
    },

    unenrollLocal: (state, { payload }) => {
      const courseId = payload.toLowerCase().trim();
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
