"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import ProtectedRoute from "../../Account/ProtectedRoute";

export default function CourseLayout({ children }) {
  const router = useRouter();
  const { cid } = useParams();
  const cidNorm = cid.toLowerCase();

  const currentUser = useSelector((s: any) => s.accountReducer.currentUser);
  const enrollments = useSelector((s: any) => s.enrollmentsReducer.enrollments);

  if (currentUser === undefined || enrollments === undefined) return null;

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }

    const role = currentUser.role?.toUpperCase();
    const isAdmin = role === "ADMIN";
    const isFaculty = role === "FACULTY";
    const isStudent = role === "STUDENT" || role === "USER";

    const isEnrolled = enrollments.includes(cidNorm);

    if (isAdmin || isFaculty) return;

    if (isStudent && !isEnrolled) {
      router.push("/Courses");
      return;
    }
  }, [currentUser, enrollments, cidNorm, router]);

  console.log("cidNorm:", cidNorm);
  console.log("enrollments from redux:", enrollments);
  console.log("includes?", enrollments.includes(cidNorm));


  return (
    <ProtectedRoute>
      <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          Course {cid}
        </h2>

        <hr />

        <div className="d-flex">
          <div className="d-none d-md-block" style={{ width: 200 }}>
            <CourseNavigation />
          </div>
          <div className="flex-fill">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
