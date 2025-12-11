"use client";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function FillBlankEditor({ question, onChange }) {
  const [answers, setAnswers] = useState(question.answers || [""]);

  function updateAnswer(i, value) {
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
    onChange({ answers: updated });
  }

  function addAnswer() {
    const updated = [...answers, ""];
    setAnswers(updated);
    onChange({ answers: updated });
  }

  function removeAnswer(i) {
    const updated = answers.filter((_, idx) => idx !== i);
    setAnswers(updated);
    onChange({ answers: updated });
  }

  return (
    <div>
      <h5>Accepted Answers</h5>

      {answers.map((a, i) => (
        <div key={i} className="d-flex gap-2 mb-2">

          <Form.Control
            value={a}
            onChange={(e) => updateAnswer(i, e.target.value)}
          />

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeAnswer(i)}
          >
            ✕
          </Button>
        </div>
      ))}

      <Button className="mt-2" onClick={addAnswer}>
        + Add Answer
      </Button>
    </div>
  );
}
