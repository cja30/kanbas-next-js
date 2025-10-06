import Link from "next/link";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Badge from "react-bootstrap/Badge";

import { FaSearch, FaPlus, FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";

type Props = { params: { cid: string } };

export default function Assignments({ params: { cid } }: Props) {
  const items = [
    { id: "123", title: "A1 – ENV + HTML", avail: "May 6 at 12:00am", due: "May 13 at 11:59pm", pts: 100 },
    { id: "124", title: "A2 – CSS + BOOTSTRAP", avail: "May 13 at 12:00am", due: "May 20 at 11:59pm", pts: 100 },
    { id: "125", title: "A3 – JAVASCRIPT + REACT", avail: "May 20 at 12:00am", due: "May 27 at 11:59pm", pts: 100 },
  ];

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
        <ListGroupItem className="p-0 mb-3 border-gray">
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
              <ListGroupItem key={a.id} className="wd-assignment-item p-3 ps-2">
                <div className="d-flex">
                  <BsGripVertical className="me-3 fs-5 text-muted" />
                  <div className="flex-fill">
                    <Link href={`/Courses/${cid}/Assignments/${a.id}`} className="text-decoration-none">
                      <div className="fw-semibold text-primary">{a.title}</div>
                    </Link>
                    <div className="small text-muted">
                      Multiple Modules <span className="mx-2">|</span>
                      <strong>Not available until</strong> {a.avail} <span className="mx-2">|</span>
                      <br className="d-md-none" />
                      <strong>Due</strong> {a.due} <span className="mx-2">|</span>{a.pts} pts
                    </div>
                  </div>
                  <div className="d-flex align-items-center ms-3">
                    <FaCheckCircle className="text-success me-3" />
                    <IoEllipsisVertical className="fs-4" />
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
