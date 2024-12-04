"use client";
/* eslint-disable @next/next/no-img-element */
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  X,
} from "lucide-react";
import moment from "moment";
import { useEffect, useRef } from "react";
import L from "leaflet";
import { useAuthContext } from "@/contexts/authContext";
import { Crown } from "@/components/Crown/crown";
import { ActivityStatus } from "@/components/Interfaces/activity.interface";

export function ModalActivity({
  isModalOpen,
  onCancell,
  onClose,
  id,
  name,
  description,
  image,
  date,
  time,
  place,
  latitude,
  longitude,
  creator,
  category,
  status,
  reports
}: {
  reports?:{description:string;id:string;}[]
  onCancell:()=>void,
  status: string;
  text?: string;
  isModalOpen: boolean;
  onClose: () => void;
  id: string;
  category: { id: string; name: string };
  creator: {
    name: string;
    lastname: string;
    avatar: string;
    isPremium: boolean;
  };
  date: string;
  description: string;
  image: string;
  latitude: string;
  longitude: string;
  name: string;
  place: string;
  time: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuthContext();
  useEffect(() => {
    let map: L.Map | null = null;

    if (isModalOpen && latitude && longitude) {
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);

      if (!document.getElementById(`map-${id}`)?.hasChildNodes()) {
        map = L.map(`map-${id}`).setView([lat, lon], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
          map
        );

        L.marker([lat, lon])
          .addTo(map)
          .bindPopup("Ubicación del evento")
          .openPopup();
      }
    }
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [isModalOpen, latitude, longitude, id, userId]);
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="h-3/4 bg-customPalette-gray rounded-lg lg:w-3/4 w-4/5 max-w-2xl p-4 shadow-lg border border-customPalette-gray relative overflow-y-scroll "
      >
        {reports && (
          <div className="flex flex-col w-full mb-5">
            <h3 className="text-lg font-semibold text-customPalette-red">Reportes</h3>
            <div className="flex flex-col justify-start items-start">
                {reports.map((repor)=>
                  <p key={repor.id} className="p-4 bg-white shadow-md rounded-lg mb-4 text-customPalette-graydark">{repor.description}</p>
                )}
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center justify-start text-gray-500 mb-2">
          <div className="relative">
            <img
              src={creator.avatar}
              className="relative w-8 h-8 mr-2 rounded-full bg-gray-600 flex items-center justify-center"
              alt={`avatar-${creator.name}-${creator.lastname}`}
            />
            <Crown
              isPremium={creator.isPremium}
              className="-top-2.5 -left-2.5"
            />
          </div>
          <span className="text-customPalette-black">{`${creator.name} ${creator.lastname}`}</span>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
          <div className="w-full h-full flex items-start justify-start flex-col">
            <h3 className="lg:text-2xl font-semibold text-customPalette-bluedark mb-2">
              {name}
            </h3>
            <span className="text-center bg-customPalette-orange rounded px-2 py1 mb-2">
              {category.name}
            </span>
            <img
              src={image}
              alt={`ubicacion-${name}`}
              className="w-full h-48 object-cover"
            />
            <p className="w-full text-customPalette-graydark mb-4">
              {description}
            </p>
            <div className="w-full flex items-center mb-2">
              <CalendarIcon className="w-4 h-4 mr-2 text-customPalette-graydark" />
              <span className="text-customPalette-graydark">
                {moment(date, "YYYY-MM-DD").format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="w-full flex items-center mb-2">
              <ClockIcon className="w-4 h-4 mr-2 text-customPalette-graydark" />
              <span className="text-customPalette-graydark">{time}</span>
            </div>
          </div>
          <div className="w-full h-full flex items-start justify-start flex-col">
            <div className="flex items-center  mb-3 pt-1">
              <MapPinIcon className="w-4 h-4 mr-2 text-customPalette-graydark" />
              <span className="text-customPalette-graydark">{place}</span>
            </div>
            <div
              id={`map-${id}`}
              className="h-48 w-full mb-2 flex-shrink-0"
            ></div>
            <a
              href={`https://www.google.com/maps?q=${latitude},${longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-customPalette-bluelink underline text-base hover:text-customPalette-bluelight mb-3"
            >
              Ver en Google Maps
            </a>
          </div>
          <div>
          <button
                onClick={
                  status !== ActivityStatus.CANCELLED &&
                  status !== ActivityStatus.SUCCESS
                    ? () => onCancell
                    : undefined
                }
                className={`text-xs text-white px-4 py-2 rounded-md shadow-md duration-300 ease-in-out
                            ${
                              status !== ActivityStatus.CANCELLED &&
                              status !== ActivityStatus.SUCCESS
                                ? "bg-customPalette-orange hover:bg-customPalette-orangebright cursor-pointer"
                                : "bg-customPalette-graydark cursor-not-allowed"
                            }`}> 
                Cancelar Actividad
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalActivity;
