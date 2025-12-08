import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

import { setEnrollments } from "../Enrollments/reducer";
import * as enrollClient from "../Enrollments/client";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const loadSession = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));

      if (currentUser) {
        const enrollments = await enrollClient.findMyEnrollments();
        dispatch(setEnrollments(enrollments));
      }
    } catch (err: any) {
      console.error("Session load error:", err);
    }

    setPending(false);
  };

  useEffect(() => {
    loadSession();
  }, []);

  if (!pending) return children;

  return null; 
}
