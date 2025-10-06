import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AccountNavigation from "../Navigation";

export default function Signin() {
  return (
    <div className="wd-main-content-offset container-fluid py-3">
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div id="wd-signin-screen">
            <h1 className="h3 mb-3">Signin</h1>

            <Form.Control
              id="wd-username"
              placeholder="username"
              className="mb-2"
            />
            <Form.Control
              id="wd-password"
              placeholder="password"
              type="password"
              className="mb-2"
            />

            <Link
              id="wd-signin-btn"
              href="/Account/Profile"
              className="btn btn-primary w-100 mb-2"
            >
              Signin
            </Link>

            <Link id="wd-signup-link" href="/Account/Signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
