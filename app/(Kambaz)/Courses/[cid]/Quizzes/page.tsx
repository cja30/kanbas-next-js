"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import QuizList from "@/app/components/QuizList";
import { v4 as uuid } from "uuid";

export default function QuizzesPage({ params }) {
  const { cid } = params;
  const user = useSelector((state) => state.accountReducer.currentUser);

  const [quizzes, setQuizzes] = useState([]);

  const loadQuizzes = useCallback(async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/courses/${cid}/quizzes?uid=${user?._id}`);
    const data = await res.json();
    setQuizzes(data);
  }, [cid]);

  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);

  const isFaculty = user?.role === "FACULTY";

  return (
    <div className="p-4">

      {isFaculty && (
        <div className="d-flex justify-content-end mb-3">
          <Button
              variant="danger"
              size="lg"
              onClick={async () => {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/courses/${cid}/quizzes`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    title: "New Quiz",
                    description: "",
                    published: false,
                    points: 0,
                    quizType: "GRADED_QUIZ",
                    assignmentGroup: "Quizzes",
                    shuffleAnswers: true,
                    timeLimit: 20,
                    multipleAttempts: false,
                    allowedAttempts: 1,
                    showCorrectAnswers: "never",
                    accessCode: "",
                    oneQuestionAtATime: true,
                    webcamRequired: false,
                    lockQuestionsAfterAnswering: false,
                    dueDate: "",
                    availableDate: "",
                    untilDate: "",
                  }),
                });

                const newQuiz = await res.json();

                window.location.href = `/Courses/${cid}/Quizzes/${newQuiz._id}/Edit`;
              }}
            >
              + Quiz
            </Button>
        </div>
      )}

      <QuizList
        quizzes={quizzes}
        cid={cid}
        refresh={loadQuizzes}
      />
    </div>
  );
}
