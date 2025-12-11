"use client";

import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function MultipleChoiceEditor({ question, onChange }) {
  const [choices, setChoices] = useState(question.choices || []);
  const [correctIndex, setCorrectIndex] = useState(question.correctIndex ?? 0);

  useEffect(() => {
    onChange({ choices, correctIndex });
  }, [choices, correctIndex]);

  function updateChoice(i, value) {
    const newChoices = [...choices];
    newChoices[i] = value;
    setChoices(newChoices);
  }

  function addChoice() {
    setChoices([...choices, ""]);
  }

  function removeChoice(i) {
    const updated = choices.filter((_, idx) => idx !== i);
    setChoices(updated);

    if (correctIndex >= updated.length) setCorrectIndex(0);
  }

  return (
    <div className="mt-3">
      <h5>Choices</h5>

      {choices.map((c, i) => (
        <div key={i} className="d-flex align-items-center gap-2 mb-2">
          <Form.Check
            type="radio"
            checked={correctIndex === i}
            onChange={() => setCorrectIndex(i)}
          />
          <Form.Control
            value={c}
            onChange={(e) => updateChoice(i, e.target.value)}
          />
          <Button variant="outline-danger" size="sm" onClick={() => removeChoice(i)}>
            ✕
          </Button>
        </div>
      ))}

      <Button onClick={addChoice}>+ Add Choice</Button>
    </div>
  );
}
