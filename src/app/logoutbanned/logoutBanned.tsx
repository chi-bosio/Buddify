"use client"
import { useAuthContext } from "@/contexts/authContext";

function LogoutBanned() {
  const { logout } = useAuthContext();
  logout();
  return (
    <div>
      <h1>Deslogueo de usuario....</h1>
    </div>
  );
}
export default LogoutBanned;
