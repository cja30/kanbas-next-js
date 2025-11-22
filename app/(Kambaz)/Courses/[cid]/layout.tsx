"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import ProtectedRoute from "../../Account/ProtectedRoute";

export default function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { cid: string };
}) {
  const { cid } = params;

  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { enrollments } = useSelector((s: any) => s.enrollmentsReducer);

  if (!currentUser) redirect("/Account/Signin");

  const role = currentUser.role;

  const isEnrolled = enrollments.some(
    (e: any) => e.user === currentUser._id && e.course === cid
  );

  const isAdmin = role === "ADMIN";
  const isFaculty = role === "FACULTY";
  const isStudent = role === "STUDENT" || role === "USER";

  if (!isAdmin) {
    if (isStudent && !isEnrolled) redirect("/Dashboard");
    if (isFaculty && !isEnrolled) redirect("/Dashboard"); 
  }

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
