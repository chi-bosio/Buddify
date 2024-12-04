"use client";
import React from "react";
import UserList from "./userList";
import RedirecNotAdmin from "@/components/RedirectNotAdmin/redirectNotAdmin";

const AdminUsersBan: React.FC<{ fetchData: () => void }> = ({ fetchData }) => {
  return (
    <main>
      <RedirecNotAdmin />
      <UserList fetchData={fetchData} />
    </main>
  );
};

export default AdminUsersBan;
