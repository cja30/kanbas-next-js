"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as db from "../../Database";
import { v4 as uuidv4 } from "uuid";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [profile, setProfile] = useState<any>({
    username: "",
    password: "",
    verify: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "USER",
  });

  const signup = () => {
    if (profile.password !== profile.verify) {
      alert("Passwords do not match");
      return;
    }

    const exists = db.users.some((u: any) => u.username === profile.username);
    if (exists) {
      alert("Username already exists");
      return;
    }

    const newUser = {
      ...profile,
      _id: uuidv4(),
    };

    db.users.push(newUser);

    dispatch(setCurrentUser(newUser));

    router.push("/Dashboard");
  };

  return (
    <div className="wd-main-content-offset container-fluid py-3">
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div id="wd-signup-screen">
            <h1 className="h3 mb-3">Signup</h1>

            <Form.Control
              placeholder="username"
              className="mb-2"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />

            <Form.Control
              placeholder="password"
              type="password"
              className="mb-2"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />

            <Form.Control
              placeholder="verify password"
              type="password"
              className="mb-2"
              value={profile.verify}
              onChange={(e) =>
                setProfile({ ...profile, verify: e.target.value })
              }
            />

            <Form.Control
              placeholder="first name"
              className="mb-2"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />

            <Form.Control
              placeholder="last name"
              className="mb-2"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />

            <Form.Control
              placeholder="email"
              className="mb-2"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />

            <Form.Select
              className="mb-2"
              value={profile.role}
              onChange={(e) =>
                setProfile({ ...profile, role: e.target.value })
              }
            >
              <option value="USER">User</option>
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Admin</option>
            </Form.Select>

            <Button
              id="wd-signup-btn"
              className="btn btn-primary w-100 mb-2"
              onClick={signup}
            >
              Signup
            </Button>

            <Link href="/Account/Signin" id="wd-signin-link">
              Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
