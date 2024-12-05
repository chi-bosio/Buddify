import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const RedirecNotLogin: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "No estás logueado",
        text: "Por favor inicia sesión para continuar.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/login");
      });
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700">Cargando...</p>
      </div>
    </div>
  );
};

export default RedirecNotLogin;
