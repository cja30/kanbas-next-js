'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";

type Item = {
  href: string;
  id: string;
  label: string;
  icon: React.ReactNode;
};

export default function KambazNavigation() {
  const pathname = usePathname() || "/";

  const items: Item[] = [
    { href: "/",          id: "wd-home-link",      label: "Home",      icon: <AiOutlineDashboard className="fs-1 text-danger" /> },

    { href: "/Account",   id: "wd-account-link",   label: "Account",   icon: <FaRegCircleUser className="fs-1 text-white" /> },
    { href: "/Dashboard", id: "wd-dashboard-link", label: "Dashboard", icon: <AiOutlineDashboard className="fs-1 text-danger" /> },
    { href: "/Calendar",  id: "wd-calendar-link",  label: "Calendar",  icon: <IoCalendarOutline className="fs-1 text-danger" /> },
    { href: "/Inbox",     id: "wd-inbox-link",     label: "Inbox",     icon: <FaInbox className="fs-1 text-danger" /> },
    { href: "/Courses",   id: "wd-courses-link",   label: "Courses",   icon: <LiaBookSolid className="fs-1 text-danger" /> },
    
    { href: "/Labs",      id: "wd-labs-link",      label: "Labs",      icon: <LiaBookSolid className="fs-1 text-danger" /> },

    { href: "/Settings",  id: "wd-settings-link",  label: "Settings",  icon: <LiaCogSolid className="fs-1 text-danger" /> },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 text-center"
      style={{ width: 110 }}
    >
      <ListGroupItem className="bg-black border-0">
        <a
          className="d-inline-block"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.northeastern.edu/"
          id="wd-neu-link"
        >
          <img src="/images/NEU.svg" width="75" alt="Northeastern University" />
        </a>
      </ListGroupItem>

      {items.map((it) => {
        const active = isActive(it.href);
        const base = "border-0 text-center rounded-0 text-decoration-none";
        const className = active ? `bg-white ${base}` : `bg-black ${base}`;
        const textClass = active ? "text-danger" : "text-white";

        return (
          <ListGroupItem key={it.id} className={className}>
            <Link href={it.href} id={it.id} className={`${textClass} text-decoration-none`}>
              <div className="d-flex flex-column align-items-center">
                {/* Keep Account icon white to match rubric */}
                {it.label === "Account"
                  ? <FaRegCircleUser className="fs-1 text-white" />
                  : it.icon}
                <small className={textClass}>{it.label}</small>
              </div>
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
