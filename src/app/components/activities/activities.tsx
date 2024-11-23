"use client";
import CardActivity from "@/app/components/activities/components/CardActivity/CardActivity";
import ModalActivity from "@/app/components/activities/components/ModalActivity/ModalActivity";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import CombinedFilters from "./components/CombinedFilters/CombinedFilters";
import { Activity } from "../../../components/Interfaces/activity.interface";
import Swal from "sweetalert2";
import { postData } from "./components/ModalActivity/components/postData";
import ModalInsingStatus from "@/components/ModalInsingStatus/ModalInsingStatus";
import PlansButton from "../../stripe/Plans/PlansButton";

export function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);

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
  const handlerSubmit = async (
    id: string,
    userId: string | null,
    onClose: () => void
  ) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Considera si puedes ir antes de unirte",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#235789",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Unirme",
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
      const success = await postData({ activityId: id, userId: userId });
      Swal.close();
      if (success) {
        onClose();
      }
    }
  };
  return (
    <section className="relative min-h-screen bg-[url('/assets/textura-fondo.avif')] bg-customPalette-white flex flex-col items-center justify-start w-full ">
      <div className="z-10 flex flex-col items-center justify-start w-auto lg:w-2/4 min-h-screen bg-customPalette-white lg:px-24 px-10 shadow-lg border border-customPalette-white">
        <h1 className="text-4xl font-bold text-customPalette-blue text-center mt-4 mb-14">
          Actividades cercanas a ti
        </h1>
        <div className="rounded lg:absolute lg:top-5 lg:left-5 lg:w-72 lg:h-52 overflow-hidden">
          <ModalInsingStatus bol={false} />
        </div>
        <CombinedFilters setActivities={setActivities} />
        <PlansButton />
        {activities.length === 0 && (
          <div className="text-customPalette-orange">
            No hay actividades por el momento...
          </div>
        )}
        {activities.map((activity) => (
          <CardActivity
            key={activity.id}
            {...activity}
            onClick={() => openModal(activity)}
          />
        ))}
      </div>
      {selectedActivity && (
        <ModalActivity
          {...selectedActivity}
          handlerSubmit={handlerSubmit}
          textSubmit="Unirme"
          isModalOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

export default Activities;
