"use client";
import React from "react";
import UserList from "./userList";

const AdminActivities = ({ fetchData }: { fetchData: () => void }) => {
  return (
    <main>
      <UserList fetchData={fetchData} />
    </main>
  );
};

export default AdminActivities;
