"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { setCourses as setCoursesRedux } from "../Courses/reducer";
import * as coursesClient from "../Courses/client";

import * as enrollClient from "../Enrollments/client";
import { setEnrollments } from "../Enrollments/reducer";

export default function DashboardContent() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((s: any) => s.accountReducer);

  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>(null);

  const role = currentUser?.role;
  const isAdmin = role === "ADMIN";
  const isFaculty = role === "FACULTY";
  const isStudent = role === "STUDENT" || role === "USER";

  useEffect(() => {
    if (!currentUser) return;
    reloadCourses();
  }, [currentUser]);

  const reloadCourses = async () => {
    if (isAdmin) {
      const all = await coursesClient.fetchAllCourses();
      setCourses(all);
      dispatch(setCoursesRedux(all));
    } else {
      const mine = await coursesClient.findMyCourses();
      setCourses(mine);
      dispatch(setCoursesRedux(mine));

      const myEnrollments = await enrollClient.findMyEnrollments();
      dispatch(setEnrollments(myEnrollments));
    }
  };

  const beginEdit = (c: any) => setCourse({ ...c });

  const onAddNewCourse = async () => {
    if (!currentUser) return;

    await coursesClient.createCourse({
      ...course,
      creator: currentUser._id,
    });

    await reloadCourses();
    setCourse(null);
  };

  const onUpdateCourse = async () => {
    await coursesClient.updateCourse(course);
    await reloadCourses();
    setCourse(null);
  };

  const onDeleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    await reloadCourses();
  };

  return (
    <div id="wd-dashboard" className="p-4">
      <h1>Dashboard</h1>
      <hr />

      {(isAdmin || isFaculty) && (
        <>
          <h4>{course ? "Edit Course" : "Add New Course"}</h4>

          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={course?.name || ""}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />

          <FormControl
            className="mb-2"
            placeholder="Course Description"
            as="textarea"
            rows={3}
            value={course?.description || ""}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />

          {!course?._id && (
            <Button onClick={onAddNewCourse} className="btn btn-primary mb-4">
              Add
            </Button>
          )}

          {course?._id && (
            <Button onClick={onUpdateCourse} className="btn btn-secondary mb-4">
              Update
            </Button>
          )}

          <hr />
        </>
      )}

      <Row xs={1} md={5} className="g-4">
        {courses.map((c: any) => (
          <Col key={c._id} style={{ width: 300 }}>
            <Card>
              <Link
                href={`/Courses/${c._id}/Home`}
                className="text-decoration-none text-dark"
              >
                <Card.Img src={"/images/reactjs.jpg"} height={160} />

                <Card.Body>
                  <Card.Title>{c.name}</Card.Title>

                  <Card.Text
                    className="overflow-hidden"
                    style={{ height: 100 }}
                  >
                    {c.description}
                  </Card.Text>

                  <Button className="btn btn-primary">Go</Button>
                </Card.Body>
              </Link>

              {(isAdmin || isFaculty) && (
                <div className="d-flex gap-2 m-2">
                  <Button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      beginEdit(c);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      onDeleteCourse(c._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
