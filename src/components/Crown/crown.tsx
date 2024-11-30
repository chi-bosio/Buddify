"use client";
import { CrownIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function Crown({className,isPremium}:{className:string,isPremium:boolean}) {
  const [premium, setIsPremium] = useState(false);
  useEffect(() => {
    if (isPremium) {
      setIsPremium(isPremium);
    }
  }, [isPremium]);
  if (!premium) {
    return null;
  }
  return (
    <div className={`z-20 absolute ${ className } -rotate-45`}>
      <CrownIcon className="text-customPalette-orange h-4 w-4" />
    </div>
  );
}
