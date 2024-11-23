import { useState } from "react";
import Plans from "./Plans";

export default function PlansButton() {
  const [showPlans, setShowPlans] = useState(false);

  const handleTogglePlans = () => {
    setShowPlans(!showPlans);
  };

  return (
    <>
      {/* Botón flotante */}
      <div
        onClick={handleTogglePlans}
        className="fixed bottom-10 right-10 bg-customPalette-blue text-customPalette-white rounded-full shadow-lg p-4  cursor-pointer hover:bg-customPalette-bluedark transition-all flex items-center justify-center group   overflow-hidden duration-300  hover:w-32 hover:rounded-lg"
        aria-label="Toggle Plans"
      >
        {/* Icono */}
        <svg
          className="w-6 h-6 transition-all duration-300 group-hover:scale-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z"
            fill="currentColor"
          />
        </svg>

        {/* Texto "Ver Planes" */}
        <div className="absolute right-7 bottom-4 transform translate-x-full opacity-0 text-white text-sm font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Ver Planes
        </div>
      </div>

      {/* Contenedor de los planes */}
      {showPlans && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative w-100 h-[80vh] rounded-lg">
            <Plans />
            <button
              onClick={handleTogglePlans}
              className="absolute top-4 right-4 hover:bg-customPalette-bluedark text-customPalette-white text-3xl rounded-full w-9 h-9 flex justify-center items-center"
              aria-label="Cerrar Planes"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
