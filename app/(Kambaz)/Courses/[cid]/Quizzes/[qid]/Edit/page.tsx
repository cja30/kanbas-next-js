"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import QuestionEditorWrapper from "@/app/components/QuestionEditorWrapper";
import { v4 as uuid } from "uuid";

type Tab = "details" | "questions";
type QuestionMode = "list" | "edit";

export default function QuizEditorPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab =
    searchParams.get("tab") === "questions" ? "questions" : "details";

  const [tab, setTab] = useState<Tab>(initialTab);
  const [quiz, setQuiz] = useState<any>(null);

  const [questions, setQuestions] = useState<any[]>([]);
  const [qMode, setQMode] = useState<QuestionMode>("list");
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);

  useEffect(() => {
    async function loadQuiz() {
      const res = await fetch(`http://localhost:4000/api/quizzes/${qid}`);
      const data = await res.json();
      setQuiz(data);
    }
    if (qid) loadQuiz();
  }, [qid]);

  useEffect(() => {
    async function loadQuestions() {
      const res = await fetch(
        `http://localhost:4000/api/quizzes/${qid}/questions`
      );
      const data = await res.json();
      setQuestions(data);
    }
    if (qid) loadQuestions();
  }, [qid]);

  async function saveQuiz(options: { publish?: boolean; goToList?: boolean }) {
    if (!quiz) return;

    const { publish = false, goToList = false } = options;

    await fetch(`http://localhost:4000/api/quizzes/${qid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...quiz,
        published: publish ? true : quiz.published,
      }),
    });

    if (goToList) {
      router.push(`/Courses/${cid}/Quizzes`);
    } else {
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    }
  }

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
      correct: true,
    };

    setEditingQuestion(blank);
    setQMode("edit");
    setTab("questions");
  }

  async function saveQuestion(updated: any) {
    const exists = questions.find((q) => q._id === updated._id);

    if (exists) {
      await fetch(`http://localhost:4000/api/questions/${updated._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } else {
      await fetch(`http://localhost:4000/api/quizzes/${qid}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    }

    const refreshed = await fetch(
      `http://localhost:4000/api/quizzes/${qid}/questions`
    ).then((r) => r.json());

    setQuestions(refreshed);
    setEditingQuestion(null);
    setQMode("list");
    setTab("questions");
  }

  async function deleteQuestion(id: string) {
    await fetch(`http://localhost:4000/api/questions/${id}`, {
      method: "DELETE",
    });

    setQuestions((prev) => prev.filter((q) => q._id !== id));
  }

  if (!quiz) return <div className="p-3">Loading...</div>;

  const renderDetails = () => (
    <>
      <h2 className="h4 mb-4">{quiz.title || "Edit Quiz"}</h2>

      <Form>
        {/* TITLE */}
        <Form.Group className="mb-3">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={quiz.description || ""}
            onChange={(e) =>
              setQuiz({ ...quiz, description: e.target.value })
            }
          />
        </Form.Group>

        {/* POINTS (READONLY) */}
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            readOnly
            value={questions.reduce(
              (sum, q) => sum + (q.points || 0),
              0
            )}
          />
        </Form.Group>

        {/* QUIZ TYPE */}
        <Form.Group className="mb-3">
          <Form.Label>Quiz Type</Form.Label>
          <Form.Select
            value={quiz.quizType || "GRADED_QUIZ"}
            onChange={(e) =>
              setQuiz({ ...quiz, quizType: e.target.value })
            }
          >
            <option value="GRADED_QUIZ">Graded Quiz</option>
            <option value="PRACTICE_QUIZ">Practice Quiz</option>
            <option value="GRADED_SURVEY">Graded Survey</option>
            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
          </Form.Select>
        </Form.Group>

        {/* ASSIGNMENT GROUP */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select
            value={quiz.assignmentGroup || "Quizzes"}
            onChange={(e) =>
              setQuiz({ ...quiz, assignmentGroup: e.target.value })
            }
          >
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project">Project</option>
          </Form.Select>
        </Form.Group>

        {/* SHUFFLE ANSWERS */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers || false}
            onChange={() =>
              setQuiz({
                ...quiz,
                shuffleAnswers: !quiz.shuffleAnswers,
              })
            }
          />
        </Form.Group>

        {/* TIME LIMIT */}
        <Form.Group className="mb-3">
          <Form.Label>Time Limit (minutes)</Form.Label>
          <Form.Control
            type="number"
            value={quiz.timeLimit || 20}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                timeLimit: Number(e.target.value),
              })
            }
          />
        </Form.Group>

        {/* MULTIPLE ATTEMPTS */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Allow Multiple Attempts"
            checked={quiz.multipleAttempts || false}
            onChange={() =>
              setQuiz({
                ...quiz,
                multipleAttempts: !quiz.multipleAttempts,
              })
            }
          />

          {quiz.multipleAttempts && (
            <div className="ms-4 mt-2">
              <Form.Label>Allowed Attempts</Form.Label>
              <Form.Control
                type="number"
                value={quiz.allowedAttempts || 1}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    allowedAttempts: Number(e.target.value),
                  })
                }
                style={{ width: "120px" }}
              />
            </div>
          )}
        </Form.Group>

        {/* SHOW CORRECT ANSWERS */}
        <Form.Group className="mb-3">
          <Form.Label>Show Correct Answers</Form.Label>
          <Form.Select
            value={quiz.showCorrectAnswers || "never"}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                showCorrectAnswers: e.target.value,
              })
            }
          >
            <option value="never">Never</option>
            <option value="immediately">Immediately</option>
            <option value="after_due_date">After Due Date</option>
          </Form.Select>
        </Form.Group>

        {/* ACCESS CODE */}
        <Form.Group className="mb-3">
          <Form.Label>Access Code</Form.Label>
          <Form.Control
            type="text"
            value={quiz.accessCode || ""}
            onChange={(e) =>
              setQuiz({ ...quiz, accessCode: e.target.value })
            }
          />
        </Form.Group>

        {/* ONE QUESTION AT A TIME */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="One Question at a Time"
            checked={quiz.oneQuestionAtATime || false}
            onChange={() =>
              setQuiz({
                ...quiz,
                oneQuestionAtATime: !quiz.oneQuestionAtATime,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Webcam Required"
            checked={quiz.webcamRequired || false}
            onChange={() =>
              setQuiz({
                ...quiz,
                webcamRequired: !quiz.webcamRequired,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Lock Questions After Answering"
            checked={quiz.lockQuestionsAfterAnswering || false}
            onChange={() =>
              setQuiz({
                ...quiz,
                lockQuestionsAfterAnswering:
                  !quiz.lockQuestionsAfterAnswering,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={quiz.dueDate || ""}
            onChange={(e) =>
              setQuiz({ ...quiz, dueDate: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="datetime-local"
            value={quiz.availableDate || ""}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                availableDate: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Until</Form.Label>
          <Form.Control
            type="datetime-local"
            value={quiz.untilDate || ""}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                untilDate: e.target.value,
              })
            }
          />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
          >
            Cancel
          </Button>

          <Button
            variant="success"
            onClick={() =>
              saveQuiz({ publish: true, goToList: true })
            }
          >
            Save & Publish
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              saveQuiz({ publish: false, goToList: false })
            }
          >
            Save
          </Button>
        </div>
      </Form>
    </>
  );

  const renderQuestions = () => {
    if (qMode === "list") {
      return (
        <>
          <h2 className="h4 mb-4">Questions</h2>

          <Button
            variant="danger"
            className="mb-3"
            onClick={newQuestion}
          >
            + New Question
          </Button>

          {questions.length === 0 && <p>No questions yet.</p>}

          <div className="space-y-3">
            {questions.map((q) => (
              <div key={q._id} className="border rounded p-3 mb-2">
                <div className="fw-semibold">
                  {q.title || "(Untitled Question)"}
                </div>
                <div className="text-muted small">Type: {q.type}</div>

                <div className="mt-2 d-flex gap-2">
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => {
                      setEditingQuestion(q);
                      setQMode("edit");
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => deleteQuestion(q._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (qMode === "edit" && editingQuestion) {
      return (
        <>
          <h2 className="h4 mb-4">Edit Question</h2>

          <QuestionEditorWrapper
            question={editingQuestion}
            onSave={(updated) => saveQuestion(updated)}
            onCancel={() => {
              setEditingQuestion(null);
              setQMode("list");
            }}
          />
        </>
      );
    }

    return null;
  };

  return (
    <div className="p-3" style={{ maxWidth: "850px" }}>
      {/* Tabs row */}
      <div className="d-flex border-bottom mb-4 gap-3">
        <button
          className={
            "btn border-0 rounded-0 " +
            (tab === "details"
              ? "border-bottom border-primary fw-semibold"
              : "text-secondary")
          }
          onClick={() => setTab("details")}
        >
          Details
        </button>

        <button
          className={
            "btn border-0 rounded-0 " +
            (tab === "questions"
              ? "border-bottom border-primary fw-semibold"
              : "text-secondary")
          }
          onClick={() => setTab("questions")}
        >
          Questions
        </button>
      </div>

      {tab === "details" ? renderDetails() : renderQuestions()}
    </div>
  );
}
