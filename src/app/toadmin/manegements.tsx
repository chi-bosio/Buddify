"use client";
import React, { useEffect, useState } from "react";
import UserList from "./userList";

const AdminUsersToAdmin = () => {
  const [users, setUsers] = useState<any[]>([]);

  // Función que obtiene los usuarios desde la API
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Los datos no son un array:", data);
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  // Llamamos a fetchData cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <main>
      <UserList fetchData={fetchData} users={users} />
    </main>
  );
};

export default AdminUsersToAdmin;
