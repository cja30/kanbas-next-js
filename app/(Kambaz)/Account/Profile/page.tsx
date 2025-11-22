"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!currentUser) {
      redirect("/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser]);

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  if (!profile) return null; 

  return (
    <div className="wd-main-content-offset container-fluid py-3">
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div id="wd-profile-screen">
            <h1 className="h3 mb-3">Profile</h1>
            
            <Form.Control
              id="wd-username"
              className="mb-2"
              defaultValue={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />

            <Form.Control
              id="wd-password"
              className="mb-2"
              type="password"
              defaultValue={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />

            <Form.Control
              id="wd-firstname"
              className="mb-2"
              defaultValue={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />

            <Form.Control
              id="wd-lastname"
              className="mb-2"
              defaultValue={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />

            <Form.Control
              id="wd-dob"
              type="date"
              className="mb-2"
              defaultValue={profile.dob}
              onChange={(e) =>
                setProfile({ ...profile, dob: e.target.value })
              }
            />

            <Form.Control
              id="wd-email"
              className="mb-2"
              defaultValue={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />

            <Form.Select
              id="wd-role"
              className="mb-3"
              defaultValue={profile.role}
              onChange={(e) =>
                setProfile({ ...profile, role: e.target.value })
              }
            >
              <option value="USER">User</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </Form.Select>

            <Button
              id="wd-signout-btn"
              className="btn btn-danger w-100"
              onClick={signout}
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
