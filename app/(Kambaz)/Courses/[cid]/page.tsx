"use client";

import { useParams, usePathname } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { courses as allCourses } from "../../Database";

export default function CoursesPage() {
  const params = useParams<{ cid: string }>();
  const cid = params?.cid ?? "";
  const pathname = usePathname() ?? "";
  const course = allCourses.find((c: any) => c._id === cid);

 
  const parts = pathname.split("/");
  const section = parts[4] ?? "Home";

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-3 fs-4 mb-1" />
        {course?.name} &gt; {section}
      </h2>
    </div>
  );
}
