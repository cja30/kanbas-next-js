import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";

export default function CourseLayout({ children, params }: any) {
  const { cid } = params;

  return (
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
  );
}
