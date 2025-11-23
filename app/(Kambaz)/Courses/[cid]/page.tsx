"use client";

import { useParams, usePathname } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function CoursesPage() {
  const { cid } = useParams<{ cid: string }>();
  const pathname = usePathname() ?? "";

  const { courses } = useSelector((state: any) => state.coursesReducer);

  const course = courses.find((c: any) => c._id === cid);

  const parts = pathname.split("/");
  const section = parts[4] ?? "Home";

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-3 fs-4 mb-1" />
        {course?.name ?? "Unknown Course"} &gt; {section}
      </h2>
    </div>
  );
}
