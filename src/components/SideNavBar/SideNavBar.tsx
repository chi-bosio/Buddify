"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export function SideNavBar() {
  const [open, setOpen] = useState(true); 
  const sideNavRef = useRef<HTMLDivElement>(null); 

  const handleClickOutside = (event: MouseEvent) => {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
      <div
        ref={sideNavRef} 
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } z-20 absolute top-0 left-0 h-auto w-64 p-6 pb-64 rounded-lg shadow-md border border-customPalette-gray bg-customPalette-white transform transition-transform duration-300 ease-in-out flex items-start justify-center`}
      >
        <div className="flex justify-center items-start flex-col">
          <h2 className="text-2xl font-semibold text-customPalette-blue mb-6">
            Actividades
          </h2>
          <ul className="space-y-4">
            <li>
              <Link
                href="/activities/create-activity"
                className="text-customPalette-blue hover:text-customPalette-bluedark underline"
              >
                Crear actividad
              </Link>
            </li>
            <li>
              <Link
                href="/activities/view-activities"
                className="text-customPalette-blue hover:text-customPalette-bluedark underline"
              >
                Ver actividades
              </Link>
            </li>
            <li>
              <Link
                href="/activities/manage-activities"
                className="text-customPalette-blue hover:text-customPalette-bluedark underline"
              >
                Gestionar actividades
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className={`${
            open ? "translate-x-0" : "translate-x-20"
          } z-20 bg-customPalette-blue text-white px-3 py-2 rounded-md shadow-md hover:bg-customPalette-bluedark duration-300 ease-in-out`}
        >
          <ArrowRight
            className={`transform transition-transform duration-300 ease-in-out ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
  );
}

export default SideNavBar;
