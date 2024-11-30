"use client";

import getActivities from "@/components/GetActivities/getActivities";
import { Activity } from "@/components/Interfaces/activity.interface";
import { useAuthContext } from "@/contexts/authContext";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalActivity from "../components/activities/components/ModalActivity/ModalActivity";
import CardActivity from "./components/CardActivity/CardActivity";
import ModalInsingStatus from "@/components/ModalInsingStatus/ModalInsingStatus";
import { postData } from "./components/postData";
import PlansButton from "../plans/PlansButton";
import { CircleFadingPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export function MyActivities() {
  const router = useRouter()
  const { userId} = useAuthContext();
  const [activitiesCreated, setActivitiesCreated] = useState<Activity[]>([]);
  const [activitiesJoined, setActivitiesJoined] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedActivity(null);
    setIsModalOpen(false);
  };

  const fetchData = useCallback(async () => {
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
    const timeoutId = setTimeout(() => {
      Swal.close();
    }, 500);

    setTimeout(() => {
      clearInterval(timeoutId); 
    }, 700);
  }, [userId]);

  async function handlerSubmit(
    id: string,
    idUser: string | null,
    onClose: () => void,
    text?: string
  ) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#235789",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
    });
    if (result.isConfirmed) {
      Swal.fire({
        title: "Cargando...",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const success = await postData({ activityId: id, userId: idUser });
      const timeoutId = setTimeout(() => {
        Swal.close();
      }, 500);

      setTimeout(() => {
        clearInterval(timeoutId); 
      }, 700);
      if (success) {
        setTimeout(() => {
          onClose();
          fetchData();
        }, 900);
      }
    }
  }

  useEffect(() => {
    if (userId) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);


  const handlerRedirectHome = () => {
    router.push(`/`);
  }

  const handlerRedirectCreateAct = () => {
    router.push(`/create-activity`);
  }

  return (
    <section className="w-full min-h-screen relative bg-[url('/assets/textura-fondo.avif')] py-6 px-3">
      <section className="flex flex-col lg:flex-row">
        <ModalInsingStatus bol={true} />
        <div className="w-full">
          <section className="relative mb-6 rounded flex flex-col items-start justify-center px-4 py-2 bg-customPalette-white shadow-lg border border-customPalette-white">
            <h1 className="mb-3 font-bold text-lg text-customPalette-blue">
              Mis eventos
            </h1>
            {activitiesCreated ? (
              activitiesCreated.length === 0 && (
                <div className="text-customPalette-orange">
                  No create ninguna actividad aun{" "}
                  <Link
                    href="/create-activity"
                    className="underline text-customPalette-bluelightst cursor-pointer"
                  >
                    crea una
                  </Link>
                </div>
              )
            ) : (
              <div className="text-customPalette-orange">
                No create ninguna actividad aun{" "}
                <Link
                  href="/create-activity"
                  className="underline text-customPalette-bluelightst cursor-pointer"
                >
                  crea una
                </Link>
              </div>
            )}
            <div className="lg:grid lg:grid-cols-3 w-full gap-2">
              <div className="rounded bg-customPalette-green cursor-pointer hover:opacity-70 p-0.5 transition-all ease-in-out duration-300 absolute -top-4 right-0 ">
                <CircleFadingPlus onClick={handlerRedirectCreateAct} className="rounded bg-customPalette-green text-customPalette-white h-8 w-8  py-1 px-1 border border-customPalette-white"/>
              </div>
              {activitiesCreated &&
                activitiesCreated.map((activity) => (
                  <CardActivity
                    key={activity.id}
                    activity={activity}
                    handlerOnCancel={() => {
                      handlerSubmit(
                        activity.id,
                        userId,
                        closeModal,
                        "Estas seguro de cancelar la actividad"
                      );
                    }}
                    handlerOnView={() => openModal(activity)}
                  />
                ))}
              <PlansButton />
            </div>
          </section>
          <section className="relative  mb-6 rounded flex flex-col items-start justify-center px-4 py-2 bg-customPalette-white shadow-lg border border-customPalette-white">
            <h1 className="mb-3 font-bold text-lg text-customPalette-blue">
              Eventos a los que asistire
            </h1>
            {activitiesJoined ? (
              activitiesJoined.length === 0 && (
                <div className="text-customPalette-orange">
                  No te uniste ninguna actividad aun{" "}
                  <Link
                    href="/"
                    className="underline text-customPalette-bluelightst cursor-pointer"
                  >
                    busca alguna
                  </Link>
                </div>
              )
            ) : (
              <div className="text-customPalette-orange">
                No te uniste ninguna actividad aun{" "}
                <Link
                  href="/"
                  className="underline text-customPalette-bluelightst cursor-pointer"
                >
                  busca alguna
                </Link>
              </div>
            )}
            <div className="lg:grid lg:grid-cols-3 w-full gap-2">
              <div className="rounded bg-customPalette-green cursor-pointer hover:opacity-70 p-0.5 transition-all ease-in-out duration-300 absolute -top-4 right-0 ">
                <CircleFadingPlus onClick={handlerRedirectHome} className="rounded bg-customPalette-green text-customPalette-white h-8 w-8 py-1 px-1 border border-customPalette-white"/>
              </div>
              {activitiesJoined &&
                activitiesJoined.map((activity) => (
                  <CardActivity
                    key={activity.id}
                    activity={activity}
                    handlerOnCancel={() => {
                      handlerSubmit(
                        activity.id,
                        userId,
                        closeModal,
                        "Se eliminara tu asistencia a este actividad"
                      );
                    }}
                    handlerOnView={() => openModal(activity)}
                  />
                ))}
            </div>
          </section>
        </div>
      </section>

      {selectedActivity && activitiesCreated.includes(selectedActivity) && (
        <ModalActivity
          text="Estas seguro de cancelar la actividad"
          handlerSubmit={handlerSubmit}
          textSubmit="Cancelar Actividad"
          {...selectedActivity}
          isModalOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      {selectedActivity && activitiesJoined.includes(selectedActivity) && (
        <ModalActivity
          text="Se eliminara tu asistencia a este actividad"
          handlerSubmit={handlerSubmit}
          textSubmit="No ire"
          {...selectedActivity}
          isModalOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

export default MyActivities;
