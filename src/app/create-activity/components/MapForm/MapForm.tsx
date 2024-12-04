/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import Swal from "sweetalert2";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

interface MapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

export function MapForm({ onLocationSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (mapRef.current) {
          if (!leafletMap.current) {
            leafletMap.current = L.map(mapRef.current).setView(
              [latitude, longitude],
              13
            );

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "© OpenStreetMap contributors",
            }).addTo(leafletMap.current);

            const marker = L.marker([latitude, longitude], { draggable: true })
              .addTo(leafletMap.current)
              .on("dragend", () => {
                const latLng = marker.getLatLng();
                onLocationSelect(latLng.lat, latLng.lng);
              });

            onLocationSelect(latitude, longitude);
          } else {
            leafletMap.current.setView([latitude, longitude], 13);
          }
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          Swal.fire({
            title: "Ubicación requerida",
            text: "Debés permitir el acceso a tu ubicación para crear una actividad.",
            icon: "warning",
            confirmButtonText: "Reintentar",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              requestLocation();
            }
          });
        } else {
          console.error("Error al obtener la ubicación:", error);
        }
      }
    );
  };

  useEffect(() => {
    if (leafletMap.current) return;

    if (mapRef.current) {
      requestLocation();
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="rounded"
      style={{ width: "100%", height: "300px" }}
    />
  );
}

export default MapForm;
