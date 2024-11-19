/* eslint-disable @next/next/no-img-element */
import { CalendarIcon, ClockIcon, MapPinIcon, X } from "lucide-react";
import moment from "moment";
import { useEffect, useRef } from "react";
import L from "leaflet";

export function ModalActivity({
    isModalOpen,
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
}: {
    isModalOpen: boolean;
    onClose: () => void;
    id: string;
    name: string;
    description: string;
    image: string;
    date: Date;
    time: string;
    place: string;
    latitude: string;
    longitude: string;
    creator: {
        name: string;
        lastname: string;
        avatar: string;
    };
}) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let map: L.Map | null = null;

        if (isModalOpen && latitude && longitude) {
            const lat = parseFloat(latitude);
            const lon = parseFloat(longitude);

            if (!document.getElementById(`map-${id}`)?.hasChildNodes()) {
                map = L.map(`map-${id}`).setView([lat, lon], 13);

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

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
    }, [isModalOpen, latitude, longitude, id]);

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleClickOutside}
        >
            <div
                ref={modalRef}
                className="h-3/4 lg:h-auto bg-customPalette-gray rounded-lg lg:w-3/4 w-4/5 max-w-2xl p-4 shadow-lg border border-customPalette-gray relative overflow-scroll lg:overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-600 hover:text-gray-900"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="flex items-center justify-start text-gray-500 mb-2">
                    <img
                        src={creator.avatar}
                        className="w-8 h-8 mr-2 rounded-full bg-gray-600 flex items-center justify-center"
                        alt={`avatar-${creator.name}-${creator.lastname}`}
                    />
                    <span>{`${creator.name} ${creator.lastname}`}</span>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                    <div className="w-full h-full flex items-center justify-start flex-col">
                        <h3 className="lg:text-2xl font-semibold text-customPalette-bluedark mb-2">
                            {name}
                        </h3>
                        <img
                            src={image}
                            alt={`ubicacion-${name}`}
                            className="w-full h-48 object-cover"
                        />
                        <p className="w-full text-gray-600 mb-4">{description}</p>
                        <div className="w-full flex items-center text-gray-500 mb-2">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            <span>{moment(date, "YYYY-MM-DD").format("DD/MM/YYYY")}</span>
                        </div>
                        <div className="w-full flex items-center text-gray-500 mb-2">
                            <ClockIcon className="w-4 h-4 mr-2" />
                            <span>{time}</span>
                        </div>
                    </div>
                    <div className="w-full h-full flex items-start justify-start flex-col">
                        <div className="flex items-center text-gray-500 mb-3 pt-1">
                            <MapPinIcon className="w-4 h-4 mr-2" />
                            <span>{place}</span>
                        </div>
                        <div id={`map-${id}`} className="h-48 w-full mb-2 flex-shrink-0"></div>
                        <a
                            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-customPalette-bluelink underline text-base hover:text-customPalette-bluelight"
                        >
                            Ver en Google Maps
                        </a>
                        <div className="h-full w-full flex items-end justify-end">
                            <button className="text-lg bg-customPalette-orange text-white px-4 py-2 rounded-md shadow-md hover:bg-customPalette-orangebright duration-300 ease-in-out">
                                Unirme
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalActivity;
