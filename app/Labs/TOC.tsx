"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap"; 
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TOC() {
  const pathname = usePathname();

  return (
    <Nav variant="pills" id="wd-toc">
      <NavItem>
        <NavLink as={Link} href="/Labs/Lab1" id="wd-a1"
                 active={pathname.includes("Lab1")}>
          Lab 1
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink as={Link} href="/Labs/Lab2" id="wd-a2"
                 active={pathname.includes("Lab2")}>
          Lab 2
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink as={Link} href="/Labs/Lab3" id="wd-a3"
                 active={pathname.includes("Lab3")}>
          Lab 3
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink as={Link} href="/Kambaz" id="wd-a4">
          Kambaz
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/cja30" target="_blank">
          My GitHub
        </NavLink>
      </NavItem>
    </Nav>
  );
}
