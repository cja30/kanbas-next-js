import { Button } from "react-bootstrap";

import { MdDoNotDisturbAlt, MdAnalytics } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";

import { AiOutlineHome } from "react-icons/ai";
import { FaStream, FaBullhorn, FaBell } from "react-icons/fa";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: 350 }}>
      <h2 className="h4">Course Status</h2>
      
      <div className="d-flex gap-2">
        <Button variant="secondary" size="lg" className="w-50 text-nowrap">
          <MdDoNotDisturbAlt className="me-2 fs-5" />
          Unpublish
        </Button>
        <Button variant="success" size="lg" className="w-50 text-nowrap">
          <FaCheckCircle className="me-2 fs-5" />
          Publish
        </Button>
      </div>

      {/* Rest of actions */}
      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <BiImport className="me-2 fs-5" />
        Import Existing Content
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <LiaFileImportSolid className="me-2 fs-5" />
        Import from Commons
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <AiOutlineHome className="me-2 fs-5" />
        Choose Home Page
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <FaStream className="me-2 fs-5" />
        View Course Stream
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <FaBullhorn className="me-2 fs-5" />
        New Announcement
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <MdAnalytics className="me-2 fs-5" />
        New Analytics
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <FaBell className="me-2 fs-5" />
        View Course Notifications
      </Button>
    </div>
  );
}
