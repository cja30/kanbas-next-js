"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function QuizDetailsPage({ params }) {
  const { cid, qid } = params;
  const router = useRouter();
  const user = useSelector((state) => state.accountReducer.currentUser);

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function load() {
      const q = await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}`).then((r) =>
        r.json()
      );
      const qs = await fetch(
        `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}/questions`
      ).then((r) => r.json());
      setQuiz(q);
      setQuestions(qs);
    }
    load();
  }, [qid]);

  if (!quiz) return <div className="p-4">Loading...</div>;

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  async function handleDone() {
    if (user?.role === "FACULTY" || user?.role === "ADMIN") {
      await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${qid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: true }),
      });
    }

    router.push(`/Courses/${cid}/Quizzes`);
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      <h1 className="fw-bold fs-2 mb-2">{quiz.title || "Untitled Quiz"}</h1>

      {/* STATUS + AVAILABILITY */}
      <div className="mb-4 text-muted">
        <div>
          {(() => {
            const now = new Date();
            const available = quiz.availableDate
              ? new Date(quiz.availableDate)
              : null;
            const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

            if (available && now < available) {
              return <span>Not available until {available.toLocaleString()}</span>;
            }

            if (until && now > until) {
              return <span className="text-danger fw-semibold">Closed</span>;
            }

            return <span className="text-success fw-semibold">Available</span>;
          })()}
        </div>

        <div>Due: {quiz.dueDate || "None"}</div>
        <div>Points: {totalPoints}</div>
        <div>Questions: {questions.length}</div>

        {user?.role === "STUDENT" && <div>Score: Not taken</div>}
      </div>

      <h2 className="fw-bold fs-3 mb-3">Details</h2>

      <Card className="p-4 shadow-sm mb-4">
        <DetailRow label="Quiz Type" value={quiz.quizType || "GRADED_QUIZ"} />
        <DetailRow label="Points" value={totalPoints} />
        <DetailRow label="Assignment Group" value={quiz.assignmentGroup || "Quizzes"} />
        <DetailRow label="Shuffle Answers" value={quiz.shuffleAnswers ? "Yes" : "No"} />
        <DetailRow label="Time Limit" value={`${quiz.timeLimit || 20} minutes`} />
        <DetailRow label="Multiple Attempts" value={quiz.multipleAttempts ? "Yes" : "No"} />

        {quiz.multipleAttempts && (
          <DetailRow label="Allowed Attempts" value={quiz.allowedAttempts || 1} />
        )}

        <DetailRow
          label="Show Correct Answers"
          value={quiz.showCorrectAnswers || "Never"}
        />
        <DetailRow label="Access Code" value={quiz.accessCode || "None"} />
        <DetailRow
          label="One Question at a Time"
          value={quiz.oneQuestionAtATime ? "Yes" : "No"}
        />
        <DetailRow label="Webcam Required" value={quiz.webcamRequired ? "Yes" : "No"} />
        <DetailRow
          label="Lock Questions After Answering"
          value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
        />
      </Card>

      <Card className="shadow-sm">
        <table className="table mb-0">
          <thead>
            <tr className="table-light">
              <th>Due</th>
              <th>Available From</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quiz.dueDate || "None"}</td>
              <td>{quiz.availableDate || "None"}</td>
              <td>{quiz.untilDate || "None"}</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <div className="d-flex justify-content-end mt-4 gap-3">
        <Link
          href={`/Courses/${cid}/Quizzes/${qid}/Edit`}
          className="btn btn-warning text-white px-4"
        >
          Edit
        </Link>

        <Link
          href={`/Courses/${cid}/Quizzes/${qid}/Preview`}
          className="btn btn-primary text-white px-4"
        >
          Preview
        </Link>

        <Button variant="danger" className="px-4" onClick={handleDone}>
          Done
        </Button>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="d-flex justify-content-between border-bottom py-2">
      <span className="fw-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
}
