"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import { FaSearch, FaPlus, FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";

import assignments from "../../../Database/assignments.json";

type RouteParams = { cid: string };

type Assignment = {
  _id: string;
  title: string;
  course: string;   
  avail?: string;  
  due?: string;   
  pts?: number;    
};

export default function AssignmentsPage() {
  const { cid } = useParams<RouteParams>();
  const all = (assignments as Assignment[]) ?? [];
  const items = all.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments" className="p-3 pe-3">
      {/* Top controls */}
      <div className="d-flex align-items-center mb-3">
        <InputGroup className="me-auto" style={{ maxWidth: 420 }}>
          <span className="input-group-text bg-white">
            <FaSearch className="opacity-75" />
          </span>
          <Form.Control id="wd-search-assignment" placeholder="Search for Assignments" />
        </InputGroup>

        <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
          <FaPlus className="me-2" /> Group
        </Button>
        <Button variant="danger" size="lg" id="wd-add-assignment">
          <FaPlus className="me-2" /> Assignment
        </Button>
      </div>

      <ListGroup className="rounded-0">
        <ListGroup.Item className="p-0 mb-3 border-gray">
          <div className="d-flex align-items-center justify-content-between p-3 bg-secondary">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-4" />
              <span className="fw-semibold">ASSIGNMENTS</span>
              <Badge bg="light" text="dark" className="ms-2">40% of Total</Badge>
            </div>
            <div>
              <Button size="sm" variant="light" className="border-0 me-1"><FaPlus /></Button>
              <Button size="sm" variant="light" className="border-0"><IoEllipsisVertical /></Button>
            </div>
          </div>

          <ListGroup variant="flush" className="rounded-0">
            {items.map((a) => (
              <ListGroup.Item key={a._id} className="wd-assignment-item p-3 ps-2">
                <div className="d-flex">
                  <BsGripVertical className="me-3 fs-5 text-muted" />
                  <div className="flex-fill">
                    <Link
                      href={`/Courses/${cid}/Assignments/${a._id}`}
                      className="text-decoration-none"
                      id={`wd-assignment-link-${a._id}`}
                    >
                      <div className="fw-semibold text-primary">{a.title}</div>
                    </Link>

                    <div className="small text-muted">
                      {/* These are optional fields; show only if present */}
                      {a.avail && (
                        <>
                          <strong>Not available until</strong> {a.avail} <span className="mx-2">|</span>
                        </>
                      )}
                      {a.due && (
                        <>
                          <strong>Due</strong> {a.due} <span className="mx-2">|</span>
                        </>
                      )}
                      {typeof a.pts === "number" ? `${a.pts} pts` : null}
                    </div>
                  </div>
                  <div className="d-flex align-items-center ms-3">
                    <FaCheckCircle className="text-success me-3" />
                    <IoEllipsisVertical className="fs-4" />
                  </div>
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
