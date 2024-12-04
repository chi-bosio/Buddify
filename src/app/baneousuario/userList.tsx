"use client";
import React, { useState, useEffect } from "react";
import UserRow from "./userRow";

interface User {
  id: string;
  name: string;
  lastname: string;
  isBanned: boolean;
}

const UserList: React.FC<{fetchData:()=>void}> = ({fetchData}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para búsqueda
  const [filterStatus, setFilterStatus] = useState<string>("all"); // Estado para el filtro

  const loadUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Función para aplicar los filtros
  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.name} ${user.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "banned" && user.isBanned) ||
      (filterStatus === "unbanned" && !user.isBanned);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col items-center max h-1/5 bg-gray-100 py-8">
      {/* Título */}
      <h1 className="text-2xl font-bold text-customPalette-blue mb-6">
        Gestión de Usuarios
      </h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        {/* Búsqueda por nombre */}
        <input
          type="text"
          placeholder="Buscar por nombre/apellido"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filtro de estado */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border text-customPalette-graydark border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos</option>
          <option value="banned">Baneados</option>
          <option value="unbanned">No baneados</option>
        </select>
      </div>

      {/* Lista de usuarios filtrados */}
      <div className="w-full max-w-3xl">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserRow key={user.id} user={user} onUserUpdate={loadUsers} fetchData={fetchData}/>
          ))
        ) : (
          <p className="text-customPalette-gray text-center">
            No se encontraron usuarios.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserList;
