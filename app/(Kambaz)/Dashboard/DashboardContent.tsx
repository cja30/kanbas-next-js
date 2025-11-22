"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  addCourse,
  updateCourse,
  deleteCourse,
  setEditingCourse,
} from "../Courses/reducer";

import {
  toggleShowAll,
  enroll,
  unenroll,
} from "../Enrollments/reducer";

export default function DashboardContent() {
  const dispatch = useDispatch();

  const { courses, editingCourse } = useSelector((s: any) => s.coursesReducer);
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { enrollments, showAll } = useSelector((s: any) => s.enrollmentsReducer);

  useEffect(() => {
    dispatch(setEditingCourse(null));
  }, [dispatch]);

  const role = currentUser?.role;
  const isAdmin = role === "ADMIN";
  const isFaculty = role === "FACULTY";

  const isEnrolled = (cid: string) =>
    enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === cid
    );

  const visibleCourses =
    !currentUser
      ? []
      : isAdmin
      ? courses
      : showAll
      ? courses
      : courses.filter((c: any) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard" className="p-4">

      <div className="d-flex justify-content-between align-items-center">
        <h1>Dashboard</h1>

        {currentUser && (
          <Button
            className="btn btn-primary"
            onClick={() => dispatch(toggleShowAll())}
          >
            {showAll ? "Show My Courses" : "Show All Courses"}
          </Button>
        )}
      </div>

      <hr />

      {(isAdmin || isFaculty) && (
        <>
          <h5 className="d-flex justify-content-between align-items-center">
            <span>
              {editingCourse
                ? editingCourse._id === "new"
                  ? "New Course"
                  : "Edit Course"
                : "New Course"}
            </span>

            <div className="d-flex gap-2">

              {editingCourse && editingCourse._id !== "new" && (
                <Button
                  className="btn btn-warning"
                  onClick={() => dispatch(updateCourse(editingCourse))}
                >
                  Update
                </Button>
              )}

              {editingCourse && editingCourse._id === "new" && (
                <Button
                  className="btn btn-success"
                  onClick={() => dispatch(addCourse(editingCourse))}
                >
                  Create
                </Button>
              )}

              {!editingCourse && (
                <Button
                  className="btn btn-primary"
                  onClick={() =>
                    dispatch(
                      setEditingCourse({
                        _id: "new",
                        name: "",
                        description: "",
                        image: "/images/reactjs.jpg",
                      })
                    )
                  }
                >
                  Add
                </Button>
              )}
            </div>
          </h5>

          <br />

          {editingCourse && (
            <>
              <FormControl
                className="mb-2"
                value={editingCourse.name}
                onChange={(e) =>
                  dispatch(
                    setEditingCourse({
                      ...editingCourse,
                      name: e.target.value,
                    })
                  )
                }
                placeholder="Course Name"
              />

              <FormControl
                className="mb-2"
                as="textarea"
                rows={3}
                value={editingCourse.description}
                onChange={(e) =>
                  dispatch(
                    setEditingCourse({
                      ...editingCourse,
                      description: e.target.value,
                    })
                  )
                }
                placeholder="Course Description"
              />

              <hr />
            </>
          )}
        </>
      )}

      <h2>
        {isAdmin
          ? `All Courses (${visibleCourses.length})`
          : showAll
          ? `All Courses (${visibleCourses.length})`
          : `My Courses (${visibleCourses.length})`}
      </h2>

      <hr />

      <Row xs={1} md={5} className="g-4">
        {visibleCourses.map((course: any) => (
          <Col key={course._id} style={{ width: 300 }}>
            <Card>
              <Link
                href={`/Courses/${course._id}/Home`}
                className="text-decoration-none text-dark"
              >
                <Card.Img src={course.image || "/images/reactjs.jpg"} height={160} />

                <Card.Body>
                  <Card.Title className="text-nowrap overflow-hidden">
                    {course.name}
                  </Card.Title>

                  <Card.Text
                    className="overflow-hidden"
                    style={{ height: 100 }}
                  >
                    {course.description}
                  </Card.Text>

                  <div className="d-flex justify-content-between align-items-center">

                    <Button className="btn btn-primary">Go</Button>

                    {isAdmin && (
                      <div className="d-flex gap-2">
                        <Button
                          className="btn btn-warning"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(setEditingCourse(course));
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    )}

                    {isFaculty && isEnrolled(course._id) && (
                      <div className="d-flex gap-2">
                        <Button
                          className="btn btn-warning"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(setEditingCourse(course));
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    )}

                    {!isAdmin && (
                      <div>
                        {isEnrolled(course._id) ? (
                          <Button
                            className="btn btn-danger"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(
                                unenroll({
                                  user: currentUser._id,
                                  course: course._id,
                                })
                              );
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            className="btn btn-success"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(
                                enroll({
                                  user: currentUser._id,
                                  course: course._id,
                                })
                              );
                            }}
                          >
                            Enroll
                          </Button>
                        )}
                      </div>
                    )}

                  </div>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
