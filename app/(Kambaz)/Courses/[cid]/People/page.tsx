import { redirect } from "next/navigation";

export default function PeopleIndex({ params }: any) {
  redirect(`/Courses/${params.cid}/People/Table`);
}
