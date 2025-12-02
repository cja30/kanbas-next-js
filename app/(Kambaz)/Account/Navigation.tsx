"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const links = currentUser
    ? [
        { label: "Profile", path: "/Account/Profile" },

        ...(currentUser.role === "ADMIN"
          ? [{ label: "Users", path: "/Account/Users" }]
          : []),
      ]
    : [
        { label: "Signin", path: "/Account/Signin" },
        { label: "Signup", path: "/Account/Signup" },
      ];

  return (
    <div id="wd-account-navigation">
      <div className="list-group wd fs-5 rounded-0">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.path}
            className="list-group-item border-0 text-danger"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
