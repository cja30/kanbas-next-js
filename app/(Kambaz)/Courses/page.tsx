"use client";

import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function CoursesListScreen() {
  const { courses } = useSelector((s: any) => s.coursesReducer);

  return (
    <div id="wd-courses-screen" className="p-4">
      <h1>Courses</h1>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {courses.map((course: any) => (
          <Col key={course._id} style={{ width: 300 }}>
            <Card>
              <Link
                href={`/Courses/${course._id}/Home`}
                className="text-decoration-none text-dark"
              >
                <Card.Img
                  src={course.image || "/images/reactjs.jpg"}
                  variant="top"
                  height={160}
                />

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

                  <Button className="btn btn-primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
