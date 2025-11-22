"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { addAssignment, updateAssignment } from "../reducer";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type Params = { cid: string; aid: string };

export default function AssignmentEditor() {
  const { cid, aid } = useParams<Params>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { enrollments } = useSelector((s: any) => s.enrollmentsReducer);

  const isAdmin = currentUser?.role === "ADMIN";

  const isFacultyEnrolled =
    currentUser?.role === "FACULTY" &&
    enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === cid
    );

  if (!isAdmin && !isFacultyEnrolled) {
    router.push(`/Courses/${cid}/Assignments`);
    return null;
  }

  const { assignments } = useSelector(
    (state: any) => state.assignmentsReducer
  );

  const existing = assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );

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

  const updateField = (field: string, value: any) =>
    setAssignment({ ...assignment, [field]: value });

  const save = () => {
    if (aid === "new") {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment({ ...assignment, _id: aid }));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const cancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignment-editor" className="p-3">
      <h2 className="h4 mb-4">
        {aid === "new" ? "New Assignment" : assignment.title}
      </h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={assignment.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={assignment.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={assignment.pts}
            onChange={(e) =>
              updateField("pts", Number(e.target.value))
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due</Form.Label>
          <Form.Control
            type="datetime-local"
            value={assignment.due}
            onChange={(e) =>
              updateField("due", e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="datetime-local"
            value={assignment.avail}
            onChange={(e) =>
              updateField("avail", e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Until</Form.Label>
          <Form.Control
            type="datetime-local"
            value={assignment.until}
            onChange={(e) =>
              updateField("until", e.target.value)
            }
          />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="light" onClick={cancel}>
            Cancel
          </Button>

          <Button variant="danger" onClick={save} id="wd-save-assignment">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
