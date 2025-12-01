"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as enrollClient from "../Enrollments/client";

export default function CoursesListScreen() {
  const { courses } = useSelector((s: any) => s.coursesReducer);
  const currentUser = useSelector((s: any) => s.accountReducer.currentUser);

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  if (!currentUser) return <div>Please sign in.</div>;

  const role = currentUser.role;
  const isAdmin = role === "ADMIN";
  const isFaculty = role === "FACULTY";
  const isStudent = role === "STUDENT" || role === "USER";

  useEffect(() => {
    const load = async () => {
      if (isAdmin) {
        setEnrolledCourseIds([]);
      } else {
        const enrollments = await enrollClient.findMyEnrollments();
        setEnrolledCourseIds(enrollments.map((e: any) => e.course));
      }
    };

    load();
  }, [currentUser, isAdmin]);

  const enroll = async (courseId: string) => {
    await enrollClient.enroll(courseId);
    setEnrolledCourseIds([...enrolledCourseIds, courseId]);
  };

  const unenroll = async (courseId: string) => {
    await enrollClient.unenroll(courseId);
    setEnrolledCourseIds(enrolledCourseIds.filter((id) => id !== courseId));
  };

  return (
    <div id="wd-courses-screen" className="p-4">
      <h1>Courses</h1>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {courses.map((course: any) => {
          const isEnrolled = enrolledCourseIds.includes(course._id);

          const showGo =
            isAdmin ||                  
            isFaculty ||               
            isEnrolled;               

          return (
            <Col key={course._id} style={{ width: 300 }}>
              <Card>
                <Link
                  href={showGo ? `/Courses/${course._id}/Home` : "#"}
                  onClick={(e) => {
                    if (!showGo) e.preventDefault();
                  }}
                  className="text-decoration-none text-dark"
                >
                  <Card.Img
                    src={course.image || "/images/reactjs.jpg"}
                    height={160}
                  />

                  <Card.Body>
                    <Card.Title>{course.name}</Card.Title>

                    <Card.Text style={{ height: 100, overflow: "hidden" }}>
                      {course.description}
                    </Card.Text>

                    {showGo && (
                      <Button className="btn btn-primary me-2">
                        Go
                      </Button>
                    )}

                    {!isAdmin && (
                      <Button
                        className={isEnrolled ? "btn btn-warning" : "btn btn-success"}
                        onClick={async (e) => {
                          e.preventDefault();
                          if (isEnrolled) await unenroll(course._id);
                          else await enroll(course._id);
                        }}
                      >
                        {isEnrolled ? "Unenroll" : "Enroll"}
                      </Button>
                    )}

                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
