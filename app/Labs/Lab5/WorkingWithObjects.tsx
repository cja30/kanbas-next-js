"use client";

import Form from "react-bootstrap/Form";
import React, { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleObj, setModuleObj] = useState({
    name: "",
    description: "",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />
      <h4>Modifying Assignment Title</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>

      <Form.Control
        className="w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />
      <h4>Modifying Assignment Score</h4>

      <Form.Control
        type="number"
        className="w-50"
        id="wd-assignment-score"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: e.target.value })
        }
      />

      <a
        id="wd-update-assignment-score"
        className="btn btn-success mt-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <hr />

      <h4>Modifying Completed Status</h4>

      <input
        id="wd-assignment-completed"
        type="checkbox"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />

      <a
        id="wd-update-assignment-completed"
        className="btn btn-warning ms-2"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <hr />

      <h3>Module Editing</h3>

      <h4>Module Name</h4>

      <Form.Control
        className="w-50"
        id="wd-module-name"
        placeholder="New module name"
        onChange={(e) =>
          setModuleObj({ ...moduleObj, name: e.target.value })
        }
      />

      <a
        id="wd-update-module-name"
        className="btn btn-primary mt-2"
        href={`${MODULE_API_URL}/name/${moduleObj.name}`}
      >
        Update Module Name
      </a>
      <hr />

      <h4>Module Description</h4>

      <Form.Control
        className="w-75"
        id="wd-module-description"
        placeholder="New description"
        onChange={(e) =>
          setModuleObj({ ...moduleObj, description: e.target.value })
        }
      />

      <a
        id="wd-update-module-description"
        className="btn btn-secondary mt-2"
        href={`${MODULE_API_URL}/description/${moduleObj.description}`}
      >
        Update Description
      </a>
      <hr />
    </div>
  );
}
