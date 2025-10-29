import { redirect } from "next/navigation";

export default function PeopleIndex({ params }: { params: { cid: string } }) {
  redirect(`/Courses/${params.cid}/People/Table`);
}
