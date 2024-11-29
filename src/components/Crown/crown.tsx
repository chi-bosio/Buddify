"use client";
import { CrownIcon } from "lucide-react";
import { useAuthContext } from "@/contexts/authContext";
import { useEffect, useState } from "react";

export function Crown() {
  const { isPremium } = useAuthContext();
  const [premium, setIsPremium] = useState(false);
  useEffect(() => {
    if (isPremium) {
      setIsPremium(isPremium);
    }
  });
  if (!premium) {
    return null;
  }
  return (
    <div className="absolute top-0 -left-3 -rotate-45">
      <CrownIcon className="text-yellow-300 h-3 w-3" />
    </div>
  );
}
