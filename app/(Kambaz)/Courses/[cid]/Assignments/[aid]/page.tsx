"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { setAssignments } from "../reducer";
import * as client from "../client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type Params = { cid: string; aid: string };

export default function AssignmentEditor() {
  const { cid, aid } = useParams<Params>();
  const router = useRouter();
  const dispatch = useDispatch();

  const assignments = useSelector((s: any) => s.assignmentsReducer.assignments);
  const currentUser = useSelector((s: any) => s.accountReducer.currentUser);
  const enrollments = useSelector((s: any) => s.enrollmentsReducer.enrollments);

  const role = currentUser?.role?.toUpperCase();
  const cidNorm = cid.toLowerCase();

  const isAdmin = role === "ADMIN";
  const isFacultyEnrolled = role === "FACULTY" && enrollments.includes(cidNorm);

  const existing = assignments.find((a: any) => a._id === aid) || null;

  const [assignment, setAssignment] = useState(
    existing || {
      _id: "new",
      course: cid,
      title: "",
      description: "",
      pts: 100,
      due: "",
      avail: "",
      until: "",
    }
  );

  useEffect(() => {
    if (!currentUser) return;
    if (!isAdmin && !isFacultyEnrolled) {
      router.push(`/Courses/${cid}/Assignments`);
    }
  }, [currentUser, isAdmin, isFacultyEnrolled, cid, router]);

  const save = async () => {
    if (aid === "new") {
      const created = await client.createAssignment(cid, assignment);
      dispatch(setAssignments([...assignments, created]));
    } else {
      const updated = await client.updateAssignment({
        ...assignment,
        _id: aid,
      });

      const updatedList = assignments.map((a: any) =>
        a._id === updated._id ? updated : a
      );

      dispatch(setAssignments(updatedList));
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="p-3">
      <h2 className="h4 mb-4">
        {aid === "new" ? "New Assignment" : assignment.title}
      </h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={assignment.pts}
            onChange={(e) =>
              setAssignment({ ...assignment, pts: Number(e.target.value) })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due</Form.Label>
          <Form.Control
            type="datetime-local"
            value={assignment.due}
            onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="datetime-local"
            value={assignment.avail}
            onChange={(e) => setAssignment({ ...assignment, avail: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Until</Form.Label>
          <Form.Control
            type="datetime-local"
            value={assignment.until}
            onChange={(e) => setAssignment({ ...assignment, until: e.target.value })}
          />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="light" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button variant="danger" onClick={save}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
