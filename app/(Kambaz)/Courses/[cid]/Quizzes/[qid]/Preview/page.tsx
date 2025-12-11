"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Question = {
  _id: string;
  type: "multiple" | "truefalse" | "blank";
  title?: string;
  text?: string;
  points?: number;
  choices?: string[];
  correctIndex?: number;
  correct?: boolean;
  answers?: string[];
};

export default function QuizPreviewPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [correctMap, setCorrectMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function load() {
      const quizRes = await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}`);
      const quizData = await quizRes.json();

      const qsRes = await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}/questions`);
      const qsData = await qsRes.json();

      setQuiz(quizData);
      setQuestions(qsData);

      const totalScore = qsData.reduce((sum: number, q: Question) => sum + (q.points || 0), 0);
      setMaxScore(totalScore);
    }

    if (qid) load();
  }, [qid]);

  if (!quiz) return <div className="p-4">Loading...</div>;

  function gradePreview() {
    let total = 0;
    const correctness: Record<string, boolean> = {};

    questions.forEach((q) => {
      const pts = q.points || 0;
      const ans = answers[q._id];
      let isCorrect = false;

      if (q.type === "truefalse") {
        isCorrect = ans === q.correct;
      } else if (q.type === "multiple") {
        isCorrect = ans === q.correctIndex;
      } else if (q.type === "blank") {
        const userText = (ans || "").trim().toLowerCase();
        const acceptable = (q.answers || []).map((a) => a.trim().toLowerCase());
        isCorrect = acceptable.includes(userText);
      }

      correctness[q._id] = isCorrect;
      if (isCorrect) total += pts;
    });

    setCorrectMap(correctness);
    setScore(total);
    setSubmitted(true);
  }

  function resetPreview() {
    setAnswers({});
    setCorrectMap({});
    setScore(0);
    setSubmitted(false);
  }

  function canShowCorrectAnswers() {
    const mode = quiz.showCorrectAnswers || "never";

    if (mode === "never") return false;
    if (mode === "immediately") return true;

    if (mode === "after_due_date") {
      if (!quiz.dueDate) return false;
      return new Date() > new Date(quiz.dueDate);
    }

    return false;
  }

  const showCorrect = submitted && canShowCorrectAnswers();

  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold fs-3">
          Preview: {quiz.title || "Untitled Quiz"}
        </h1>

        <button
          className="btn btn-danger"
          onClick={() =>
            router.push(`/Courses/${cid}/Quizzes/${qid}/Edit?tab=questions`)
          }
        >
          Edit Quiz
        </button>
      </div>

      {submitted && (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <span className="fw-semibold">
            Score: {score} / {maxScore}
          </span>
          <button className="btn btn-sm btn-outline-primary" onClick={resetPreview}>
            Retake Preview
          </button>
        </div>
      )}

      {questions.map((q) => {
        const ans = answers[q._id];
        const isCorrect = submitted ? correctMap[q._id] : null;

        const borderClass = submitted
          ? isCorrect
            ? "border-success"
            : "border-danger"
          : "border-secondary";

        return (
          <div key={q._id} className={`card mb-3 ${borderClass}`}>
            <div className="card-body">

              <div className="d-flex justify-content-between mb-1">
                <h5>{q.title || "Untitled Question"}</h5>
                <span className="text-muted">{q.points || 0} pts</span>
              </div>

              {q.text && <p>{q.text}</p>}

              {q.type === "multiple" && (
                q.choices?.map((choice, index) => (
                  <div className="form-check" key={index}>
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={ans === index}
                      disabled={submitted}
                      onChange={() => setAnswers({ ...answers, [q._id]: index })}
                    />
                    <label className="form-check-label">{choice}</label>
                  </div>
                ))
              )}

              {q.type === "truefalse" && (
                <>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={ans === true}
                      disabled={submitted}
                      onChange={() => setAnswers({ ...answers, [q._id]: true })}
                    />
                    <label className="form-check-label">True</label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={ans === false}
                      disabled={submitted}
                      onChange={() => setAnswers({ ...answers, [q._id]: false })}
                    />
                    <label className="form-check-label">False</label>
                  </div>
                </>
              )}

              {q.type === "blank" && (
                <input
                  className="form-control"
                  type="text"
                  disabled={submitted}
                  value={ans || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [q._id]: e.target.value })
                  }
                />
              )}

              {submitted && (
                <div className="mt-3">
                  {isCorrect ? (
                    <span className="text-success fw-semibold">✓ Correct</span>
                  ) : (
                    <>
                      <span className="text-danger fw-semibold">✗ Incorrect</span>

                      {showCorrect && (
                        <div className="text-primary mt-2">
                          {q.type === "multiple" && (
                            <>Correct Answer: <strong>{q.choices?.[q.correctIndex ?? 0]}</strong></>
                          )}
                          {q.type === "truefalse" && (
                            <>Correct Answer: <strong>{q.correct ? "True" : "False"}</strong></>
                          )}
                          {q.type === "blank" && (
                            <>Accepted Answers: <strong>{q.answers?.join(", ")}</strong></>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

            </div>
          </div>
        );
      })}

      {!submitted && questions.length > 0 && (
        <div className="d-flex justify-content-end mt-3 gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Edit?tab=details`)}
          >
            Cancel
          </button>

          <button className="btn btn-primary" onClick={gradePreview}>
            Submit Preview
          </button>
        </div>
      )}


      {submitted && (
        <div className="d-flex justify-content-end mt-3 gap-2">
          <button className="btn btn-outline-secondary" onClick={resetPreview}>
            Retake Preview
          </button>

          <button
            className="btn btn-danger"
            onClick={() =>
              router.push(`/Courses/${cid}/Quizzes/${qid}/Edit?tab=questions`)
            }
          >
            Edit Quiz
          </button>
        </div>
      )}

    </div>
  );
}
