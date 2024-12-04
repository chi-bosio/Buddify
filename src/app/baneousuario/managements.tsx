"use client";
import React from "react";
import UserList from "./userList";

const AdminUsersBan: React.FC<{fetchData:()=>void}> = ({fetchData}) => {
  return (
    <main>
      <UserList fetchData={fetchData} />
    </main>
  );
};

export default AdminUsersBan;
