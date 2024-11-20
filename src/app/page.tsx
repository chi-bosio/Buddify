"use client";
import { useAuthContext } from "@/contexts/authContext";
import Activities from "./components/activities/activities";
import Landin from "./components/landin/landin";

export default function Home() {
  const { isLoggedIn = false} = useAuthContext();
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
