import Modules from "./Modules";
import CourseStatus from "./Status";

export default function CourseHome() {
  return (
    <div id="wd-courses">
      <div className="d-flex" id="wd-home">
        <div className="flex-fill me-3">
          <Modules />
        </div>
        <div className="d-none d-xl-block" style={{ minWidth: 320 }}>
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
