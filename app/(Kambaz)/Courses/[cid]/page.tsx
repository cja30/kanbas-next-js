import { redirect } from "next/navigation";

type CoursesPageInput = { params: { cid: string } };

export default function CoursesPage(input: unknown) {
  const { cid } = (input as CoursesPageInput).params;
  redirect(`/Courses/${cid}/Home`);
}
