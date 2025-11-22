"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as db from "../../Database";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) return;        

    dispatch(setCurrentUser(user)); 
    router.push("/Dashboard");     
  };

  return (
    <div className="wd-main-content-offset container-fluid py-3">
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div id="wd-signin-screen">
            <h1 className="h3 mb-3">Sign in</h1>

            <Form.Control
              id="wd-username"
              placeholder="username"
              className="mb-2"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />

            <Form.Control
              id="wd-password"
              placeholder="password"
              type="password"
              className="mb-2"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />

            <Button
              id="wd-signin-btn"
              className="btn btn-primary w-100 mb-2"
              onClick={signin}
            >
              Sign in
            </Button>

            <Link id="wd-signup-link" href="/Account/Signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
