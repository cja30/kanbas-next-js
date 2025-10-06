import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";

export default function CourseLayout({
  children,
  params: { cid },
}: {
  children: ReactNode;
  params: { cid: string };
}) {
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course {cid}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block me-3" style={{ minWidth: 200 }}>
          <CourseNavigation />
        </div>

        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}
