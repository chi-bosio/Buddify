"use client"
import CardActivity from "@/app/components/activities/components/CardActivity/CardActivity";
import ModalActivity from "@/app/components/activities/components/ModalActivity/ModalActivity";
import "leaflet/dist/leaflet.css";
import {  useState } from "react";
import CombinedFilters from "./components/CombinedFilters/CombinedFilters";
import { Activity } from "./components/activity.interface";

export function Activities() {
const [activities, setActivities] = useState<Activity[]>([]);

const [selectedActivity, setSelectedActivity] = useState<Activity|null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
};

const closeModal = () => {
    setSelectedActivity(null);
    setIsModalOpen(false);
}

  return (
    <section 
    className="relative min-h-screen bg-[url('/assets/textura-fondo.avif')] bg-customPalette-white flex flex-col items-center justify-start w-full ">
    
    <div className="z-10 flex flex-col items-center justify-start w-auto lg:w-2/4 min-h-screen bg-customPalette-white lg:px-24 px-5 shadow-lg border border-customPalette-white">
      <h1 className="text-4xl font-bold text-customPalette-blue text-center mt-4 mb-14">
          Actividades cercanas a ti
      </h1>
      <CombinedFilters setActivities={setActivities}/>
      {activities.length === 0 && (
        <div className="text-customPalette-orange">
            No hay actividades por el momento...
        </div>
      )}
      {activities.map((activity) => (
                    <CardActivity
                        key={activity.id}
                        name={activity.name}
                        description={activity.description}
                        image={activity.image}
                        creator={activity.creator}
                        onClick={() => openModal(activity)}
                        category={activity.category}
                    />
          ))}
    </div>
    {selectedActivity && (
        <ModalActivity
            {...selectedActivity}
            isModalOpen={isModalOpen}
            onClose={closeModal}
        />
    )} 
  </section>
  );
}

export default Activities;
