"use client";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const RedirecNotAdmin = () => {
  const router = useRouter();
  const { isAdmin, logout } = useAuthContext();
  const [admin, setAdmin] = useState<boolean|null>(null);
  useEffect(()=>{
    if (isAdmin === null) return;
    if(isAdmin){
      setAdmin(isAdmin)
    }
  },[isAdmin])
  useEffect(() => {
    if (!admin) {
      Swal.fire({
        title: "No tienes permiso de Administrador",
        text: "Por favor inicia sesión como administrador",
        icon: "warning",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then(() => {
        router.push("/");
      });
    }
  }, [router, admin, logout]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700">Cargando...</p>
      </div>
    </div>
  );
};

export default RedirecNotAdmin;
