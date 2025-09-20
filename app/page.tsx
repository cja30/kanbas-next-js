import { redirect } from "next/navigation";

export default function Root() {
  redirect("/Account/Signin");
}