"use client";
import React, { useState } from "react";
import UserRow from "./userRow";

interface UserListProps {
  fetchData: () => void;
  users: any[]; // Asegúrate de que el tipo de los datos sea correcto
}

const UserList: React.FC<UserListProps> = ({ fetchData, users }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRole, setFilterRole] = useState<string>("all");

  // Filtrar los usuarios por nombre/apellido y por rol (administrador/no administrador)
  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.name} ${user.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === "all" ||
      (filterRole === "admin" && user.isAdmin) ||
      (filterRole === "user" && !user.isAdmin);

    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex flex-col items-center max h-1/5 bg-gray-100 py-8">
      <h1 className="text-2xl font-bold text-customPalette-blue mb-6">
        Gestión de Usuarios
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar por nombre/apellido"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border text-customPalette-graydark border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border text-customPalette-graydark border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos</option>
          <option value="admin">Administradores</option>
          <option value="user">No administradores</option>
        </select>
      </div>

      <div className="w-full max-w-3xl">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onUserUpdate={fetchData} // Asegúrate de que `onUserUpdate` reciba `fetchData`
              fetchData={fetchData} // Pasa también la función `fetchData`
            />
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
