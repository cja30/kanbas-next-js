"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  const pathname = usePathname() || "/Kambaz";

  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses",   path: "/Courses", icon: LiaBookSolid },
    { label: "Calendar",  path: "/Calendar",  icon: IoCalendarOutline },
    { label: "Inbox",     path: "/Inbox",     icon: FaInbox },
  ];

  const isActive = (p: string) => pathname === p || pathname.startsWith(p + "/");
  const isAccount = pathname.startsWith("/Kambaz/Account");

  return (
    <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 text-center" style={{ width: 110, padding: 0 }}>
      <ListGroupItem className="bg-black border-0">
        <a target="_blank" rel="noopener noreferrer" href="https://www.northeastern.edu/" id="wd-neu-link">
          <img src="/images/NEU.svg" width="75" alt="NEU" />
        </a>
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/Account"
        className={`border-0 text-center rounded-0 ${isAccount ? "bg-white text-danger" : "bg-black text-white"}`}
      >
        <div className="d-flex flex-column align-items-center">
          <FaRegCircleUser className={`fs-1 ${isAccount ? "text-danger" : "text-white"}`} />
          <small className={isAccount ? "text-danger" : "text-white"}>Account</small>
        </div>
      </ListGroupItem>

      {links.map(({ label, path, icon: Icon }) => (
        <ListGroupItem
          key={label}
          as={Link}
          href={path}
          className={`border-0 text-center rounded-0 ${isActive(path) ? "bg-white" : "bg-black"}`}
        >
          <div className="d-flex flex-column align-items-center">
            <Icon className="fs-1 text-danger" />
            <small className={isActive(path) ? "text-danger" : "text-white"}>{label}</small>
          </div>
        </ListGroupItem>
      ))}

      <ListGroupItem className="border-0 text-center rounded-0 bg-black">
        <a href="/Labs" className="text-white text-decoration-none d-flex flex-column align-items-center">
          <LiaCogSolid className="fs-1 text-danger" />
          <small className="text-white">Labs</small>
        </a>
      </ListGroupItem>
    </ListGroup>
  );
}
