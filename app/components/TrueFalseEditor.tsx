"use client";

import { useState } from "react";
import Form from "react-bootstrap/Form";

export default function TrueFalseEditor({ question, onChange }) {
  const [correct, setCorrect] = useState(question.correct ?? true);

  function update(val) {
    setCorrect(val);
    onChange({ correct: val });
  }

  return (
    <div className="mt-3">
      <h5>Correct Answer</h5>

      <div className="d-flex gap-4">
        <Form.Check
          type="radio"
          label="True"
          name="tf"
          checked={correct === true}
          onChange={() => update(true)}
        />

        <Form.Check
          type="radio"
          label="False"
          name="tf"
          checked={correct === false}
          onChange={() => update(false)}
        />
      </div>
    </div>
  );
}
