"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import MultipleChoiceEditor from "@/app/components/MultipleChoiceEditor";
import TrueFalseEditor from "@/app/components/TrueFalseEditor";
import FillBlankEditor from "@/app/components/FillBlankEditor";

import { v4 as uuid } from "uuid";

export default function QuestionsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [editing, setEditing] = useState(null); 
  const [mode, setMode] = useState("list"); 

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}/questions`)
      .then(res => res.json())
      .then(setQuestions);
  }, [qid]);


  function newQuestion() {
    const blank = {
      _id: uuid(),
      quiz: qid,
      type: "multiple",
      title: "",
      text: "",
      points: 1,
      choices: [],       
      answers: [""],      
      correct: true     
    };

    setEditing(blank);
    setMode("edit");
  }

  
  async function saveQuestion(updated) {
    const exists = questions.find(q => q._id === updated._id);

    if (exists) {
      await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/questions/${updated._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    }

    const refreshed = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}/questions`
    ).then(r => r.json());

    setQuestions(refreshed);
    setEditing(null);
    setMode("list");
  }

  async function deleteQuestion(id) {
    await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/questions/${id}`, {
      method: "DELETE",
    });

    setQuestions(prev => prev.filter(q => q._id !== id));
  }

  function Tabs() {
    return (
      <div className="flex gap-6 text-lg border-b pb-2 mb-6">
        <span
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
          className="text-blue-600 cursor-pointer"
        >
          Details
        </span>

        <span className="font-semibold border-b-2 border-black">
          Questions
        </span>
      </div>
    );
  }


  if (mode === "list") {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Tabs />

        <h1 className="text-3xl font-bold mb-4">Questions</h1>

        <button
          onClick={newQuestion}
          className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
        >
          + New Question
        </button>

        {questions.length === 0 && <p>No questions yet.</p>}

        <div className="space-y-4">
          {questions.map(q => (
            <div key={q._id} className="border rounded p-4">
              <div className="font-semibold">{q.title || "(Untitled Question)"}</div>
              <div className="text-gray-600 text-sm">Type: {q.type}</div>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => {
                    setEditing(q);
                    setMode("edit");
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteQuestion(q._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "edit" && editing) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Tabs />

        <h1 className="text-3xl font-bold mb-4">Edit Question</h1>

        {editing.type === "multiple" && (
          <MultipleChoiceEditor
            question={editing}
            onSave={data => saveQuestion({ ...editing, ...data })}
            onCancel={() => {
              setEditing(null);
              setMode("list");
            }}
          />
        )}

        {editing.type === "truefalse" && (
          <TrueFalseEditor
            question={editing}
            onSave={data => saveQuestion({ ...editing, ...data })}
            onCancel={() => {
              setEditing(null);
              setMode("list");
            }}
          />
        )}

        {editing.type === "blank" && (
          <FillBlankEditor
            question={editing}
            onSave={data => saveQuestion({ ...editing, ...data })}
            onCancel={() => {
              setEditing(null);
              setMode("list");
            }}
          />
        )}
      </div>
    );
  }
}
