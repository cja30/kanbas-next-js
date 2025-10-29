"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const links = [
  "Home",
  "Modules",
  "Piazza",
  "Zoom",
  "Assignments",
  "Quizzes",
  "Grades",
  "People",
] as const;

function makeHref(label: (typeof links)[number], cid: string) {
  switch (label) {
    case "People":
      return `/Courses/${cid}/People/Table`;
    default:
      return `/Courses/${cid}/${label}`;
  }
}

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const pathname = usePathname() || "";
  if (!cid) return null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const href = makeHref(label, cid);
        const id = `wd-course-${label.toLowerCase()}-link`;
        const active = isActive(href);
        return (
          <Link
            key={id}
            id={id}
            href={href}
            className={`list-group-item border-0 py-2 ${active ? "active" : "text-danger"}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
