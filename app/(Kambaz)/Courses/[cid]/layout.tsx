"use client";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import ProtectedRoute from "../../Account/ProtectedRoute";

export default function CourseLayout({ children, params }) {
  const router = useRouter();
  const { cid } = params;

  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { enrollments } = useSelector((s: any) => s.enrollmentsReducer);

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }

    const role = currentUser.role;
    const isAdmin = role === "ADMIN";
    const isFaculty = role === "FACULTY";
    const isStudent = role === "STUDENT" || role === "USER";

    const isEnrolled = enrollments?.some(
      (e: any) => e.user === currentUser._id && e.course === cid
    );

    if (!isAdmin) {
      if (isStudent && !isEnrolled) router.push("/Dashboard");
      if (isFaculty && !isEnrolled) router.push("/Dashboard");
    }
  }, [currentUser, enrollments, cid, router]);

  if (!currentUser) return null;

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
