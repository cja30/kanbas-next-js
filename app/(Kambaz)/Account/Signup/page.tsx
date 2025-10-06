import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AccountNavigation from "../Navigation";

export default function Signup() {
  return (
    <div className="wd-main-content-offset container-fluid py-3">
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div id="wd-signup-screen">
            <h1 className="h3 mb-3">Signup</h1>

            <Form.Control placeholder="username" className="mb-2" />
            <Form.Control placeholder="password" type="password" className="mb-2" />
            <Form.Control placeholder="verify password" type="password" className="mb-2" />

            <Link href="/Account/Profile" className="btn btn-primary w-100 mb-2" id="wd-signup-btn">
              Signup
            </Link>

            <Link href="/Account/Signin" id="wd-signin-link">Signin</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
