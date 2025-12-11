"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import GreenCheckmark from "@/app/components/GreenCheckmark";
import HollowCircle from "@/app/components/HollowCircle";


function QuizMeta({ quiz }) {
  const now = new Date();

  const availableFrom = quiz.availableDate ? new Date(quiz.availableDate) : null;
  const availableUntil = quiz.untilDate ? new Date(quiz.untilDate) : null;
  const due = quiz.dueDate ? new Date(quiz.dueDate) : null;

  let availability = "No availability info";

  if (availableFrom && now < availableFrom) {
    availability = `Not available until ${availableFrom.toLocaleString()}`;
  } else if (
    availableFrom &&
    availableUntil &&
    now >= availableFrom &&
    now <= availableUntil
  ) {
    availability = "Available";
  } else if (availableUntil && now > availableUntil) {
    availability = "Closed";
  }

  return (
    <div className="text-muted small mt-1">
      <div>{availability}</div>
      <div>{due ? `Due ${due.toLocaleString()}` : "No due date"}</div>
      <div>{quiz.questionCount} Questions · {quiz.points} pts</div>

      {/* STUDENT SCORE */}
      {quiz.studentScore !== null && (
        <div className="text-success fw-semibold">
          Score: {quiz.studentScore} pts
        </div>
      )}
    </div>
  );
}


export default function QuizList({ quizzes, cid, refresh }) {
  const user = useSelector((state) => state.accountReducer.currentUser);
  const isStudent = user?.role === "STUDENT";
  const isFaculty = user?.role === "FACULTY" || user?.role === "ADMIN";

  const [openMenu, setOpenMenu] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!quizzes) return;

    if (isStudent) {
      setItems(quizzes.filter((q) => q.published));
    } else {
      setItems(quizzes);
    }
  }, [quizzes, isStudent]);

  function toggleMenu(id) {
    setOpenMenu(openMenu === id ? null : id);
  }

  async function deleteQuiz(id) {
    await fetch(`http://localhost:4000/api/quizzes/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((q) => q._id !== id));
    refresh();
    setOpenMenu(null);
  }

  async function togglePublish(q) {
    await fetch(`http://localhost:4000/api/quizzes/${q._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !q.published }),
    });

    setItems((prev) =>
      prev.map((item) =>
        item._id === q._id ? { ...item, published: !item.published } : item
      )
    );

    refresh();
    setOpenMenu(null);
  }

  if (!items?.length) {
    return <div className="text-muted mt-3">No quizzes yet.</div>;
  }

  return (
    <div className="border rounded">

      <div className="bg-light px-3 py-2 fw-bold d-flex align-items-center border-bottom">
        <BsGripVertical className="me-2 text-secondary" />
        QUIZZES
      </div>

      {items.map((quiz) => (
        <div
          key={quiz._id}
          className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom position-relative bg-white"
        >
          <div className="d-flex align-items-start">
            <BsGripVertical className="me-3 text-secondary fs-4" />

            <div>
              <Link
                href={
                  isStudent
                    ? `/Courses/${cid}/Quizzes/${quiz._id}/Take`
                    : `/Courses/${cid}/Quizzes/${quiz._id}`
                }
                className="fw-bold text-primary fs-5 text-decoration-none"
              >
                {quiz.title || "Untitled Quiz"}
              </Link>

              <QuizMeta quiz={quiz} />
            </div>
          </div>

          {isFaculty && (
            <div className="d-flex align-items-center gap-3">
              {quiz.published ? (
                <GreenCheckmark />
              ) : (
                <HollowCircle />
              )}

              <IoEllipsisVertical
                className="fs-4 text-secondary"
                style={{ cursor: "pointer" }}
                onClick={() => toggleMenu(quiz._id)}
              />

              {openMenu === quiz._id && (
                <div
                  className="position-absolute bg-white border shadow-sm p-2 rounded"
                  style={{ right: 10, top: 50, zIndex: 50, width: 150 }}
                >
                  <div
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      (window.location.href = `/Courses/${cid}/Quizzes/${quiz._id}/Edit`)
                    }
                  >
                    Edit
                  </div>

                  <div
                    className="dropdown-item text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteQuiz(quiz._id)}
                  >
                    Delete
                  </div>

                  <div
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => togglePublish(quiz)}
                  >
                    {quiz.published ? "Unpublish" : "Publish"}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
