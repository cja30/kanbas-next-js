"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import * as client from "./client";
import { setAssignments } from "./reducer";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";

type RouteParams = { cid: string };

export default function AssignmentsPage() {
  const dispatch = useDispatch();
  const { cid } = useParams<RouteParams>();

  const assignments = useSelector((s: any) => s.assignmentsReducer.assignments);
  const currentUser = useSelector((s: any) => s.accountReducer.currentUser);
  const enrollments = useSelector((s: any) => s.enrollmentsReducer.enrollments);

  const role = currentUser?.role;
  const isAdmin = role === "ADMIN";
  const isFaculty = role === "FACULTY";

  const enrolled = enrollments.includes(cid);

  const canEdit = isAdmin || (isFaculty && enrolled);

  useEffect(() => {
    const fetchAssignments = async () => {
      const data = await client.findAssignmentsForCourse(cid);
      dispatch(setAssignments(data));
    };
    fetchAssignments();
  }, [cid, dispatch]);

  const onDelete = async (id: string) => {
    await client.deleteAssignment(id);
    dispatch(setAssignments(assignments.filter((a: any) => a._id !== id)));
  };

  const items = assignments.filter((a: any) => a.course === cid);

  return (
    <div id="wd-assignments" className="p-3 pe-3">
      <div className="d-flex align-items-center mb-3">
        <InputGroup className="me-auto" style={{ maxWidth: 420 }}>
          <span className="input-group-text bg-white">
            <FaSearch className="opacity-75" />
          </span>
          <Form.Control placeholder="Search Assignments" />
        </InputGroup>

        {canEdit && (
          <>
            <Button variant="secondary" size="lg" className="me-2">
              <FaPlus className="me-2" /> Group
            </Button>

            <Link
              href={`/Courses/${cid}/Assignments/new`}
              className="btn btn-danger btn-lg"
            >
              <FaPlus className="me-2" /> Assignment
            </Link>
          </>
        )}
      </div>

      <ListGroup className="rounded-0">
        <ListGroup.Item className="p-0 mb-3 border-gray">
          <div className="d-flex align-items-center justify-content-between p-3 bg-secondary">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-4" />
              <span className="fw-semibold">ASSIGNMENTS</span>
              <Badge bg="light" text="dark" className="ms-2">
                40% of Total
              </Badge>
            </div>

            {canEdit && (
              <div>
                <Button size="sm" variant="light" className="border-0 me-1">
                  <FaPlus />
                </Button>
                <Button size="sm" variant="light" className="border-0">
                  <IoEllipsisVertical />
                </Button>
              </div>
            )}
          </div>

          <ListGroup variant="flush">
            {items.map((a: any) => (
              <ListGroup.Item key={a._id} className="p-3 ps-2">
                <div className="d-flex">
                  <BsGripVertical className="me-3 fs-5 text-muted" />

                  <div className="flex-fill">
                    <Link
                      href={`/Courses/${cid}/Assignments/${a._id}`}
                      className="text-decoration-none"
                    >
                      <div className="fw-semibold text-primary">{a.title}</div>
                    </Link>

                    <div className="small text-muted">
                      {a.avail && (
                        <>
                          <strong>Not available until</strong> {a.avail} |
                        </>
                      )}
                      {a.due && (
                        <>
                          <strong>Due</strong> {a.due} |
                        </>
                      )}
                      {typeof a.pts === "number" ? `${a.pts} pts` : ""}
                    </div>
                  </div>

                  {canEdit && (
                    <FaTrash
                      className="text-danger ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (confirm("Delete assignment?")) {
                          onDelete(a._id);
                        }
                      }}
                    />
                  )}
                </div>
              </ListGroup.Item>
            ))}

            {items.length === 0 && (
              <ListGroup.Item className="text-muted">
                No assignments for this course.
              </ListGroup.Item>
            )}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
