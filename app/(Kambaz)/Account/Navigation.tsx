import Link from "next/link";

type Props = {
  active?: "signin" | "signup" | "profile";
};

export default function AccountNavigation({ active = "signin" }: Props) {
  return (
    <div id="wd-account-navigation">
      <div className="list-group wd fs-5 rounded-0">
        <Link
          href="/Account/Signin"
          className={`list-group-item border-0 ${active === "signin" ? "active" : "text-danger"}`}
          id="wd-account-signin-link"
        >
          Signin
        </Link>
        <br />
        <Link
          href="/Account/Signup"
          className={`list-group-item border-0 ${active === "signup" ? "active" : "text-danger"}`}
          id="wd-account-signup-link"
        >
          Signup
        </Link>
        <br />
        <Link
          href="/Account/Profile"
          className={`list-group-item border-0 ${active === "profile" ? "active" : "text-danger"}`}
          id="wd-account-profile-link"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
