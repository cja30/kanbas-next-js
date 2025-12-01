"use client";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    if (currentUser === undefined) return;

    if (!currentUser) {
      router.replace("/Account/Signin");
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  return children;
}
