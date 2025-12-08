"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as coursesClient from "../../../client";

export default function PeopleTablePage() {
  const { cid } = useParams<{ cid: string }>();

  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!cid) return;
    const data = await coursesClient.findUsersForCourse(cid);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div className="p-3">
      <h2>People Enrolled in {cid}</h2>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
