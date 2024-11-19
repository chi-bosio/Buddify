import CardActivity from "@/components/CardActivity/CardActivity";
import SideNavBar from "@/components/SideNavBar/SideNavBar";
import "leaflet/dist/leaflet.css";

export function Activities() {
  const activities = [
    {
      id: "1",
      name: "Caminata al Cerro Uritorco",
      description: "Una experiencia única de trekking al cerro más icónico de Córdoba.",
      image: "https://via.placeholder.com/500x300.png?text=Event+Image",
      date: new Date("2024-12-15"),
      time: "08:00",
      place: "Cerro Uritorco, Córdoba, Argentina",
      latitude: "-30.7885",
      longitude: "-64.4982",
      creator: {
        name: "Juan",
        lastname: "Pérez",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
    },
    {
      id: "2",
      name: "Clase de Yoga al Amanecer",
      description: "Conecta con tu cuerpo y mente en una sesión especial al aire libre.",
      image: "https://via.placeholder.com/500x300.png?text=Event+Image",
      date: new Date("2024-12-20"),
      time: "06:30",
      place: "Parque Sarmiento, Córdoba, Argentina",
      latitude: "-31.4195",
      longitude: "-64.1888",
      creator: {
        name: "Sofía",
        lastname: "Gómez",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      },
    },
    {
      id: "3",
      name: "Taller de Fotografía Urbana",
      description: "Explora las calles de la ciudad mientras aprendes técnicas de fotografía.",
      image: "https://via.placeholder.com/500x300.png?text=Event+Image",
      date: new Date("2024-12-22"),
      time: "15:00",
      place: "Centro Histórico, Buenos Aires, Argentina",
      latitude: "-34.6037",
      longitude: "-58.3816",
      creator: {
        name: "Diego",
        lastname: "Martínez",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
    },
    {
      id: "4",
      name: "Cine bajo las estrellas",
      description: "Disfruta de una noche de cine al aire libre con películas clásicas.",
      image: "https://via.placeholder.com/500x300.png?text=Event+Image",
      date: new Date("2024-12-25"),
      time: "20:30",
      place: "Plaza de Mayo, Buenos Aires, Argentina",
      latitude: "-34.6083",
      longitude: "-58.3712",
      creator: {
        name: "Lucía",
        lastname: "Fernández",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      },
    },
    {
      id: "5",
      name: "Torneo de Fútbol 5",
      description: "Participa en nuestro torneo anual y compite por increíbles premios.",
      image: "https://via.placeholder.com/500x300.png?text=Event+Image",
      date: new Date("2024-12-30"),
      time: "17:00",
      place: "Complejo Deportivo La Docta, Córdoba, Argentina",
      latitude: "-31.3997",
      longitude: "-64.1979",
      creator: {
        name: "Carlos",
        lastname: "Ruiz",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      },
    },
];

  
  
  return (
    <section 
    className="relative min-h-screen bg-[url('/assets/textura-fondo.avif')] bg-customPalette-white flex flex-col items-center justify-start w-full ">
    
    <SideNavBar />
    <div className="z-10 flex flex-col items-center justify-start w-auto lg:w-3/4 h-full bg-customPalette-white px-24 shadow-lg border border-customPalette-white">
      <h1 className="text-4xl font-bold text-customPalette-blue text-center mt-4 mb-24">
          Actividades cercanas a ti
      </h1>
      {activities.map(activity => (
          <CardActivity
            id={activity.id}
            key={activity.id}
            name={activity.name}
            description={activity.description}
            image={activity.image}
            date={activity.date}
            time={activity.time}
            place={activity.place}
            latitude={activity.latitude}
            longitude={activity.longitude}
            creator={activity.creator}
          />
        ))}

    </div>
  </section>
  );
}

export default Activities;
