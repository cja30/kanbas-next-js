"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function ProtectedRoute({ children }: any) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (!currentUser) redirect("/Account/Signin");

  return children;
}
