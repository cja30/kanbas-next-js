"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup } from "react-bootstrap";
import { FaRegCircleUser, FaInbox } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";

const LINKS = [
  { href: "/Account",  id: "wd-account-link",   label: "Account",   icon: <FaRegCircleUser className="fs-1 text-white" />, forceWhiteIcon: true },
  { href: "/Dashboard",id: "wd-dashboard-link", label: "Dashboard", icon: <AiOutlineDashboard className="fs-1" /> },
  { href: "/Inbox",    id: "wd-inbox-link",     label: "Inbox",     icon: <FaInbox className="fs-1" /> },
  { href: "/Calendar", id: "wd-calendar-link",  label: "Calendar",  icon: <IoCalendarOutline className="fs-1" /> },
  { href: "/Courses/1234/Home", id: "wd-courses-link", label: "Courses", icon: <LiaBookSolid className="fs-1" /> },
  { href: "/Settings", id: "wd-settings-link",  label: "Settings",  icon: <LiaCogSolid className="fs-1" /> },
];

export default function KambazNavigation() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || (href.startsWith("/Courses") && pathname.startsWith("/Courses"));

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 text-center"
      style={{ width: 120 }}
    >
      <div className="bg-black border-0 text-center py-3">
        <a id="wd-neu-link" href="https://www.northeastern.edu/" target="_blank" rel="noreferrer">
          <img src="/images/NEU.png" width="75" alt="Northeastern University" />
        </a>
      </div>

      {LINKS.map(({ href, id, label, icon, forceWhiteIcon }) => {
        const active = isActive(href);
        const bg = active ? "bg-white" : "bg-black";
        const text = active ? "text-danger" : "text-white";
        const iconColor = forceWhiteIcon ? "text-white" : active ? "text-danger" : "text-danger";
        return (
          <div key={id} className={`${bg} border-0 py-3 d-block`}>
            <Link href={href} id={id} className={`${text} text-decoration-none`}>
              <div className={`${iconColor}`}>{icon}</div>
              <div className="small mt-1">{label}</div>
            </Link>
          </div>
        );
      })}
    </ListGroup>
  );
}
