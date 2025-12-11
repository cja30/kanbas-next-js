"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

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

export default function QuizTakePage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const user = useSelector((state: any) => state.accountReducer.currentUser);

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  const [score, setScore] = useState(0);
  const [correctMap, setCorrectMap] = useState<Record<string, boolean>>({});
  const [maxScore, setMaxScore] = useState(0);

  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [maxAttemptsReached, setMaxAttemptsReached] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    if (user && user.role !== "STUDENT") {
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    }
  }, [user]);

  useEffect(() => {
    async function load() {
      const quizData = await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}`).then(r => r.json());
      const qsData = await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}/questions`).then(r => r.json());
      const latest = await fetch(
        `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}/attempts/${user._id}/latest`
      ).then(r => r.json());

      setQuiz(quizData);
      setQuestions(qsData);

      const totalPts = qsData.reduce((sum, q) => sum + (q.points || 0), 0);
      setMaxScore(totalPts);

      const attemptsAllowed = quizData.multipleAttempts ? quizData.allowedAttempts : 1;

      if (latest) {
        setLatestAttempt(latest);
        setAttemptNumber(latest.attemptNumber);
        setReviewMode(true);

        setAnswers(latest.answers || {});
        setScore(latest.score || 0);

        const correctness: Record<string, boolean> = {};
        qsData.forEach((q: Question) => {
          const userAns = latest.answers?.[q._id];
          let ok = false;

          if (q.type === "multiple") ok = userAns === q.correctIndex;
          if (q.type === "truefalse") ok = userAns === q.correct;
          if (q.type === "blank") {
            const u = (userAns || "").trim().toLowerCase();
            const acc = (q.answers || []).map(a => a.trim().toLowerCase());
            ok = acc.includes(u);
          }

          correctness[q._id] = ok;
        });

        setCorrectMap(correctness);
      }

      if (latest && latest.attemptNumber >= attemptsAllowed) {
        setMaxAttemptsReached(true);
      }
    }

    if (user?._id) load();
  }, [qid, user]);

  if (!quiz || !user) return <div className="p-4">Loading...</div>;

  const showCorrect =
    (submitted || reviewMode) &&
    (
      quiz.showCorrectAnswers === "immediately" ||
      (quiz.showCorrectAnswers === "after_due_date" &&
        quiz.dueDate &&
        new Date() > new Date(quiz.dueDate))
    );

  const attemptsAllowed = quiz.multipleAttempts ? quiz.allowedAttempts : 1;
  const hasAttemptsRemaining = attemptNumber < attemptsAllowed;

  async function submitQuiz() {
    let total = 0;
    const correctness: any = {};

    questions.forEach(q => {
      const userAns = answers[q._id];
      let ok = false;

      if (q.type === "multiple") ok = userAns === q.correctIndex;
      if (q.type === "truefalse") ok = userAns === q.correct;
      if (q.type === "blank") {
        const u = (userAns || "").trim().toLowerCase();
        const acc = (q.answers || []).map(a => a.trim().toLowerCase());
        ok = acc.includes(u);
      }

      correctness[q._id] = ok;
      if (ok) total += (q.points || 0);
    });

    setCorrectMap(correctness);
    setScore(total);
    setSubmitted(true);
    setReviewMode(false);

    await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}/attempts/${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, score: total }),
    });

    const latest = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}/attempts/${user._id}/latest`
    ).then(r => r.json());

    setLatestAttempt(latest);
    setAttemptNumber(latest.attemptNumber);
  }

  function retakeQuiz() {
    if (latestAttempt && latestAttempt.attemptNumber >= attemptsAllowed) {
      setMaxAttemptsReached(true);
      return;
    }

    setReviewMode(false);
    setSubmitted(false);
    setStarted(false);
    setAnswers({});
    setCorrectMap({});
    setScore(0);
  }

  if (!started && !reviewMode) {
    return (
      <div className="container mt-5 text-center" style={{ maxWidth: "700px" }}>
        <h1 className="fw-bold">{quiz.title}</h1>

        <p className="mt-3 text-muted">{questions.length} questions • {maxScore} points</p>

        {maxAttemptsReached && (
          <div className="alert alert-danger mt-4">
            You have used all allowed attempts.
          </div>
        )}

        {!maxAttemptsReached && (
          <button
            className="btn btn-primary btn-lg mt-4"
            onClick={() => setStarted(true)}
          >
            Start Quiz
          </button>
        )}

        <div className="mt-4">
          <button className="btn btn-secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (reviewMode && latestAttempt) {
    return (
      <div className="container mt-4" style={{ maxWidth: "900px" }}>
        <h1 className="fw-bold fs-3">{quiz.title}</h1>

        <div className="alert alert-info mt-3">
          <h4>Your Last Score: {latestAttempt.score} / {maxScore}</h4>
        </div>

        {questions.map(q => (
          <ReviewCard key={q._id} q={q} showCorrect={showCorrect} answers={latestAttempt.answers} correctMap={correctMap} />
        ))}

        <div className="d-flex justify-content-end gap-2 mt-3">
          {hasAttemptsRemaining && <button className="btn btn-primary" onClick={retakeQuiz}>Retake Quiz</button>}
          <button className="btn btn-secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>Back to Quizzes</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      <h1 className="fw-bold fs-3 mb-3">{quiz.title}</h1>

      {!submitted &&
        questions.map(q => (
          <QuestionCard key={q._id} q={q} answers={answers} setAnswers={setAnswers} />
        ))
      }

      {!submitted && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger" onClick={submitQuiz}>Submit Quiz</button>
        </div>
      )}

      {submitted && (
        <>
          <div className="alert alert-info mt-4">
            <h4>Your Score: {score} / {maxScore}</h4>
          </div>

          {questions.map(q => (
            <ReviewCard key={q._id} q={q} showCorrect={showCorrect} answers={answers} correctMap={correctMap} />
          ))}

          <div className="d-flex justify-content-end gap-2 mt-3">
            {hasAttemptsRemaining && <button className="btn btn-primary" onClick={retakeQuiz}>Retake Quiz</button>}
            <button className="btn btn-secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>Back to Quizzes</button>
          </div>
        </>
      )}
    </div>
  );
}

function QuestionCard({ q, answers, setAnswers }) {
  return (
    <div className="card mb-3">
      <div className="card-body">

        <h5>{q.title} <span className="text-muted">({q.points} pts)</span></h5>
        {q.text && <p>{q.text}</p>}

        {q.type === "multiple" &&
          q.choices?.map((choice, idx) => (
            <div className="form-check" key={idx}>
              <input
                type="radio"
                className="form-check-input"
                checked={answers[q._id] === idx}
                onChange={() => setAnswers({ ...answers, [q._id]: idx })}
              />
              <label className="form-check-label">{choice}</label>
            </div>
          ))}

        {q.type === "truefalse" && (
          <>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                checked={answers[q._id] === true}
                onChange={() => setAnswers({ ...answers, [q._id]: true })}
              />
              <label className="form-check-label">True</label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                checked={answers[q._id] === false}
                onChange={() => setAnswers({ ...answers, [q._id]: false })}
              />
              <label className="form-check-label">False</label>
            </div>
          </>
        )}

        {q.type === "blank" && (
          <input
            className="form-control"
            value={answers[q._id] || ""}
            onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
          />
        )}
      </div>
    </div>
  );
}

function ReviewCard({ q, showCorrect, answers, correctMap }) {
  const userAns = answers[q._id];
  const isCorrect = correctMap[q._id];

  return (
    <div className={`card mb-3 border-${isCorrect ? "success" : "danger"}`}>
      <div className="card-body">
        <h5>{q.title} <span className="text-muted">({q.points} pts)</span></h5>
        {q.text && <p>{q.text}</p>}

        {q.type === "multiple" && (
          <p><strong>Your Answer:</strong> {q.choices?.[userAns]}</p>
        )}

        {q.type === "truefalse" && (
          <p><strong>Your Answer:</strong> {userAns ? "True" : "False"}</p>
        )}

        {q.type === "blank" && (
          <p><strong>Your Answer:</strong> {userAns}</p>
        )}

        {showCorrect && (
          <div className="text-primary mt-2">
            {q.type === "multiple" && (
              <div>Correct Answer: <strong>{q.choices?.[q.correctIndex ?? 0]}</strong></div>
            )}
            {q.type === "truefalse" && (
              <div>Correct Answer: <strong>{q.correct ? "True" : "False"}</strong></div>
            )}
            {q.type === "blank" && (
              <div>Accepted Answers: <strong>{q.answers?.join(", ")}</strong></div>
            )}
          </div>
        )}

        <div className="mt-2">
          {isCorrect ? (
            <span className="text-success fw-semibold">✓ Correct</span>
          ) : (
            <span className="text-danger fw-semibold">✗ Incorrect</span>
          )}
        </div>
      </div>
    </div>
  );
}
