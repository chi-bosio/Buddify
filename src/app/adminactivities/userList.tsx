"use client";
import React, { useState, useEffect, useCallback } from "react";
import UserRow from "./userRow";
import { useAuthContext } from "@/contexts/authContext";
import { Activity } from "@/components/Interfaces/activity.interface";


const UserList: React.FC<{fetchData:()=>void}> = ({fetchData}) => {
  const [reports, setReports] = useState<{activityId:string;description:string;id:string;}[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para búsqueda
  const [filterStatus, setFilterStatus] = useState<string>(""); // Estado para el filtro
  const [token,setToken] = useState("");
  const {authTokens} = useAuthContext()
  useEffect(()=>{
    if(authTokens?.token){
      setToken(authTokens.token)
    }
  },[authTokens?.token])
  const loadActivities = useCallback( async () => {
    if(!token) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      },
      });
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Error loading activities:", error);
    }
  },[token]);
  const loadReports = useCallback( async () => {
    if(!token) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      },
      });
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error loading activities reported:", error);
    }
  },[token]);
  useEffect(() => {
    loadActivities();
    loadReports();
  }, [loadActivities,loadReports]);

  // Función para aplicar los filtros
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = `${activity.name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    let matchesStatus = false;
    if(filterStatus === ""){
      matchesStatus= true
    }else if(filterStatus === "reported"){
      matchesStatus = reports.some((act)=> act.activityId === activity.id);
    }else{
      matchesStatus = activity.status === filterStatus;
    }
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col items-center max h-1/5 bg-gray-100 py-8">
      {/* Título */}
      <h1 className="text-2xl font-bold text-customPalette-blue mb-6">
        Gestión de Actividades
      </h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        {/* Búsqueda por nombre */}
        <input
          type="text"
          placeholder="Buscar por nombre/apellido"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border text-customPalette-graydark border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filtro de estado */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border text-customPalette-graydark border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas</option>
          <option value="success">Finalizadas</option>
          <option value="confirmed">Confirmadas</option>
          <option value="pending">Pendientes</option>
          <option value="cancelled">Canceladas</option>
          <option value="reported">Reportadas</option>
        </select>
      </div>

      {/* Lista de usuarios filtrados */}
      <div className="w-full max-w-3xl">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <UserRow 
              key={activity.id} 
              activity={activity} 
              onAcitivities={loadActivities} 
              fetchData={fetchData}
              reports={reports.some((act)=> act.activityId === activity.id) ? reports : undefined}
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
