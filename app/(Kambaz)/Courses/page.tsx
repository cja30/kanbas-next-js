"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourses } from "./reducer";
import * as client from "./client";

import CoursesListScreen from "./CoursesListScreen";

export default function CoursesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));
    };
    load();
  }, [dispatch]);

  return <CoursesListScreen />;
}
