"use client";

import { useState, useEffect } from "react";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillBlankEditor from "./FillBlankEditor";

export default function QuestionEditorWrapper({ question, onSave, onCancel }) {
  const [draft, setDraft] = useState({ ...question });

  function update(field, value) {
    setDraft((d) => ({ ...d, [field]: value }));
  }

  function handleTypeChange(newType) {
    update("type", newType);

    if (newType === "multiple") {
      update("choices", [""]);
      update("correctIndex", 0);
    }
    if (newType === "truefalse") {
      update("correct", true);
    }
    if (newType === "blank") {
      update("answers", [""]);
    }
  }

  return (
    <div className="border rounded p-4 bg-white space-y-3">
      <div>
        <label className="fw-semibold">Title</label>
        <input
          className="form-control"
          value={draft.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>

      <div>
        <label className="fw-semibold">Points</label>
        <input
          type="number"
          className="form-control w-25"
          value={draft.points}
          onChange={(e) => update("points", Number(e.target.value))}
        />
      </div>

      <div>
        <label className="fw-semibold">Question Type</label>
        <select
          className="form-control"
          value={draft.type}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="multiple">Multiple Choice</option>
          <option value="truefalse">True / False</option>
          <option value="blank">Fill in the Blank</option>
        </select>
      </div>

      <div>
        <label className="fw-semibold">Question Text</label>
        <textarea
          className="form-control"
          rows={4}
          value={draft.text}
          onChange={(e) => update("text", e.target.value)}
        />
      </div>

      {draft.type === "multiple" && (
        <MultipleChoiceEditor
          question={draft}
          onChange={(data) => setDraft((d) => ({ ...d, ...data }))}
        />
      )}

      {draft.type === "truefalse" && (
        <TrueFalseEditor
          question={draft}
          onChange={(data) => setDraft((d) => ({ ...d, ...data }))}
        />
      )}

      {draft.type === "blank" && (
        <FillBlankEditor
          question={draft}
          onChange={(data) => setDraft((d) => ({ ...d, ...data }))}
        />
      )}
      
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onSave(draft)}
        >
          Save Question
        </button>
      </div>
    </div>
  );
}
