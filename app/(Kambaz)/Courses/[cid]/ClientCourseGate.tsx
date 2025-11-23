"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CourseNavigation from "./Navigation";
import ProtectedRoute from "../../Account/ProtectedRoute";
import { FaAlignJustify } from "react-icons/fa6";

export default function ClientCourseGate({
  children,
  cid,
}: {
  children: React.ReactNode;
  cid: string;
}) {
  const router = useRouter();

  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { enrollments } = useSelector((s: any) => s.enrollmentsReducer);

  const role = currentUser?.role;
  const isAdmin = role === "ADMIN";
  const isFaculty = role === "FACULTY";
  const isStudent = role === "STUDENT" || role === "USER";

  const enrolled = enrollments.some(
    (e: any) => e.user === currentUser?._id && e.course === cid
  );

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }

    if (!isAdmin) {
      if (isStudent && !enrolled) router.push("/Dashboard");
      if (isFaculty && !enrolled) router.push("/Dashboard");
    }
  }, [currentUser, isAdmin, isStudent, isFaculty, enrolled, router]);

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
