import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AccountNavigation from "../Navigation";

export default function Profile() {
  return (
    <div className="wd-main-content-offset container-fluid py-3">
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div id="wd-profile-screen">
            <h1 className="h3 mb-3">Profile</h1>

            <Form.Control defaultValue="alice" className="mb-2" />
            <Form.Control defaultValue="123" className="mb-2" />
            <Form.Control defaultValue="Alice" className="mb-2" />
            <Form.Control defaultValue="Wonderland" className="mb-2" />
            <Form.Control placeholder="mm/dd/yyyy" className="mb-2" />
            <Form.Control defaultValue="alice@wonderland.com" className="mb-2" />
            <Form.Select defaultValue="User" className="mb-3">
              <option>User</option>
              <option>Faculty</option>
              <option>Admin</option>
            </Form.Select>

            <Link href="/Account/Signin" className="btn btn-danger w-100">
              Signout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
