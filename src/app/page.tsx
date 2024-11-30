"use client";
import { useAuthContext } from "@/contexts/authContext";
import Activities from "./components/activities/activities";
import Landin from "./components/landin/landin";
import useTokenExpiration from "@/hooks/useExpirationToken";

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
