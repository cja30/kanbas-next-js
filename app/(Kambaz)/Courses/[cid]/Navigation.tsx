"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

type Item = { href: (cid: string) => string; id: string; label: string };

const items: Item[] = [
  { href: (cid) => `/Courses/${cid}/Home`,        id: "wd-course-home-link",        label: "Home" },
  { href: (cid) => `/Courses/${cid}/Modules`,     id: "wd-course-modules-link",     label: "Modules" },
  { href: (cid) => `/Courses/${cid}/Piazza`,      id: "wd-course-piazza-link",      label: "Piazza" },
  { href: (cid) => `/Courses/${cid}/Zoom`,        id: "wd-course-zoom-link",        label: "Zoom" },
  { href: (cid) => `/Courses/${cid}/Assignments`, id: "wd-course-assignments-link", label: "Assignments" },
  { href: (cid) => `/Courses/${cid}/Quizzes`,     id: "wd-course-quizzes-link",     label: "Quizzes" },
  { href: (cid) => `/Courses/${cid}/People/Table`,id: "wd-course-people-link",      label: "People" },
];

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const pathname = usePathname() || "/";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {items.map((it) => {
        const url = it.href(cid);
        const active = isActive(url);
        return (
          <Link
            key={it.id}
            id={it.id}
            href={url}
            className={
              "list-group-item border-0 py-2 " +
              (active ? "active" : "text-danger")
            }
          >
            {it.label}
          </Link>
        );
      })}
    </div>
  );
}

