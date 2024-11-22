"use client";
import { useCallback, useEffect, useState } from "react";
import { Activity } from "@/components/Interfaces/activity.interface";
import getActivities from "../../components/GetActivities/getActivities";
import { useAuthContext } from "@/contexts/authContext";
import Swal from "sweetalert2";
import BigCalendar from "./components/BigCalendar";
import PlansButton from "@/components/Plans/PlansButton";

export function Calendar() {
  const [activitiesCreated, setActivitiesCreated] = useState<Activity[]>([]);
  const [activitiesJoined, setActivitiesJoined] = useState<Activity[]>([]);
  const { userId } = useAuthContext();
  const fetchActivities = useCallback(async () => {
    Swal.fire({
      title: "Cargando...",
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const result = await getActivities(userId);
    if (result) {
      setActivitiesCreated(result.created);
      setActivitiesJoined(result.joined);
    }

    Swal.close();
  }, [userId]);
  useEffect(() => {
    if (userId) {
      fetchActivities();
    }
  }, [fetchActivities, userId]);
  return (
    <section className="min-h-screen py-6 relative bg-[url('/assets/textura-fondo.avif')] bg-customPalette-graydark flex lg:flex-row lg:px-5  w-full">
      <PlansButton />
      <div className="flex items-center justify-start w-full flex-col lg:flex-row-reverse lg:h-full">
        <div className="flex justify-around items-center w-full flex-col my-6 px-6 lg:w-1/4">
          <h3 className="font-semibold text-lg text-customPalette-blue mb-2">
            Marcadores
          </h3>
          <div className="flex justify-around items-center w-full lg:flex-col lg:h-full">
            <div className="lg:mb-4 lg:w-full flex items-center justify-around bg-customPalette-orange rounded px-1 py-1 lg:py-4">
              <span className="text-customPalette-white text-sm lg:text-lg">
                Hoy
              </span>
            </div>
            <div className="lg:mb-4 lg:w-full opacity-70 flex items-center justify-center bg-customPalette-graydark rounded px-1 py-1 lg:py-4">
              <span className="text-customPalette-white text-sm lg:text-lg">
                Dias del mes
              </span>
            </div>
            <div className="lg:mb-4 lg:w-full flex items-center justify-center bg-customPalette-blue rounded px-1 py-1 lg:py-4">
              <span className="text-customPalette-white text-sm lg:text-lg">
                Actividades
              </span>
            </div>
            <div className="lg:mb-4 lg:w-full flex items-center justify-center bg-customPalette-green rounded px-1 py-1 lg:py-4">
              <span className="text-customPalette-white text-sm lg:text-lg">
                Actividades creadas
              </span>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          {activitiesCreated.length !== 0 && activitiesJoined.length !== 0 && (
            <BigCalendar
              activitiesCreated={activitiesCreated}
              activitiesJoined={activitiesJoined}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Calendar;
