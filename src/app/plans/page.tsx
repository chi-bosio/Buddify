"use client";
import useTokenExpiration from "@/hooks/useExpirationToken";
import Plans from "./Plans";
export default function Page() {
  useTokenExpiration();
  return (
    <Plans setShowPlans={()=>{}} />
  );
}
