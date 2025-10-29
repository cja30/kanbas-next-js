"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormSelect from "react-bootstrap/FormSelect";
import FormCheck from "react-bootstrap/FormCheck";

import assignments from "../../../../Database/assignments.json";

type Params = { cid: string; aid: string };

type Assignment = {
  _id: string;
  title: string;
  course: string;        
  description?: string;
  pts?: number;
  due?: string;        
  avail?: string;        
  until?: string;
};


function toDatetimeLocal(value?: string) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return value;
  const m = value.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})(?::\d{2})?/);
  if (m) return m[1];
  return "";
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams<Params>();
  const all = (assignments as Assignment[]) ?? [];
  const assignment =
    all.find((a) => a._id === aid && a.course === cid) ??
    ({ _id: aid, title: `Assignment ${aid}`, course: cid } as Assignment);

  return (
    <div id="wd-assignment-editor" className="p-3 pe-3">
      <h2 className="h4 mb-4">{assignment.title}</h2>

      <Form>
        <FormGroup className="mb-3" controlId="wd-assignment-name">
          <FormLabel className="fw-semibold">Assignment Name</FormLabel>
          <FormControl defaultValue={assignment.title} />
        </FormGroup>

        <FormGroup className="mb-4" controlId="wd-assignment-instructions">
          <FormLabel className="fw-semibold">Instructions</FormLabel>
          <FormControl
            as="textarea"
            rows={8}
            defaultValue={
              assignment.description ??
              `Submit a link to your Kanbas app deployed on Netlify.

Include:
• Your full name and section
• Links to each lab assignment
• Link to the Kanbas application
• Links to relevant source repositories`
            }
          />
        </FormGroup>

        <Row className="mb-3">
          <Col md={4}>
            <FormGroup controlId="wd-assignment-points">
              <FormLabel className="fw-semibold">Points</FormLabel>
              <FormControl
                type="number"
                defaultValue={assignment.pts ?? 100}
              />
            </FormGroup>
          </Col>
          <Col md={8}>
            <FormGroup controlId="wd-assignment-group">
              <FormLabel className="fw-semibold">Assignment Group</FormLabel>
              <FormSelect defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>PROJECTS</option>
              </FormSelect>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <FormGroup controlId="wd-display-grade-as">
              <FormLabel className="fw-semibold">Display Grade as</FormLabel>
              <FormSelect defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
              </FormSelect>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup controlId="wd-submission-type">
              <FormLabel className="fw-semibold">Submission Type</FormLabel>
              <FormSelect defaultValue="Online">
                <option>Online</option>
                <option>On Paper</option>
                <option>No Submission</option>
              </FormSelect>
            </FormGroup>
          </Col>
        </Row>

        <FormGroup className="mb-4" controlId="wd-online-entry-options">
          <FormLabel className="fw-semibold">Online Entry Options</FormLabel>
          <div>
            <FormCheck type="checkbox" label="Text Entry" />
            <FormCheck type="checkbox" label="Website URL" defaultChecked />
            <FormCheck type="checkbox" label="Media Recordings" />
            <FormCheck type="checkbox" label="Student Annotation" />
            <FormCheck type="checkbox" label="File Uploads" />
          </div>
        </FormGroup>

        <Row className="mb-4">
          <Col md={6}>
            <FormGroup controlId="wd-due">
              <FormLabel className="fw-semibold">Due</FormLabel>
              <FormControl
                type="datetime-local"
                defaultValue={toDatetimeLocal(assignment.due) || "2024-05-13T23:59"}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup controlId="wd-available-from">
              <FormLabel className="fw-semibold">Available from</FormLabel>
              <FormControl
                type="datetime-local"
                defaultValue={toDatetimeLocal(assignment.avail) || "2024-05-06T12:00"}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup controlId="wd-until">
              <FormLabel className="fw-semibold">Until</FormLabel>
              <FormControl
                type="datetime-local"
                defaultValue={toDatetimeLocal(assignment.until) || ""}
              />
            </FormGroup>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-light">
            Cancel
          </Link>
          <Link
            href={`/Courses/${cid}/Assignments`}
            className="btn btn-danger"
            id="wd-save-assignment"
          >
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
