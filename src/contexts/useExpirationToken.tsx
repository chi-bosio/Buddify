"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { useAuthContext } from "../hooks/authContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const useTokenExpiration = () => {
  const { authTokens, logout } = useAuthContext();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authTokens) return;
    const checkTokenExpiration = () => {
      const decodedToken: any = jwtDecode(authTokens.token);
      const expirationTime = moment(decodedToken.exp * 1000);
      console.log(expirationTime); 
      const currentTime = moment();

      if (currentTime.isAfter(expirationTime)) {
        setIsTokenExpired(true);
        Swal.fire({
            title: "Sesión Expirada",
            text: "Tu sesión ha expirado. Vuelve a logearte!.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor:"#F9A03F",
          }).then(() => {
            logout();
            router.push("/login");  
          });
      } else {
        setIsTokenExpired(false);
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 60000);

    checkTokenExpiration();

    return () => clearInterval(intervalId);
  }, [authTokens, logout, router]);

  return isTokenExpired;
};

export default useTokenExpiration;
