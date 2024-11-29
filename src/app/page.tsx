"use client";
import { useAuthContext } from "@/hooks/authContext";
import Activities from "./components/activities/activities";
import Landin from "./components/landin/landin";
import useTokenExpiration from "@/contexts/useExpirationToken";

export default function Home() {
  const { isLoggedIn = false} = useAuthContext();
  useTokenExpiration();
  return (
    <>
      {isLoggedIn ? (
        <Activities />
      ):
      (
        <Landin />
      )
        
      }
    </>
  );
}
