"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity?: string;
  totalActivity?: string;
};

type Enrollment = {
  user: string;
  course: string;
};

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();

  const { users, enrollments } = db as {
    users: User[];
    enrollments: Enrollment[];
  };

  const courseUsers: User[] = users.filter((usr: User) =>
    enrollments.some(
      (enr: Enrollment) => enr.user === usr._id && enr.course === cid
    )
  );

  return (
    <div id="wd-people-table">
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {courseUsers.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}

          {courseUsers.length === 0 && (
            <tr>
              <td colSpan={6} className="text-muted">
                No people enrolled for this course.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
