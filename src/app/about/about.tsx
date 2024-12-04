"use client";
import React from "react";

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-12 px-6">
      {/* Título principal */}
      <h1 className="text-5xl font-extrabold text-orange-500 mb-10 text-center">
        Bienvenido a Buddify 🎉
      </h1>

      {/* Descripción de la app */}
      <section className="max-w-5xl text-lg leading-relaxed bg-gray-800 shadow-lg p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-orange-400 mb-6">
          ¿Qué es Buddify? 🌟
        </h2>
        <p className="mb-4">
          <strong>Buddify</strong> es una red social diseñada para conectar
          personas a través de actividades emocionantes, dentro de un radio de{" "}
          <strong>100 kilómetros</strong>. Los usuarios pueden{" "}
          <strong>crear</strong> o <strong>unirse</strong> a actividades en
          categorías como:
        </p>
        <ul className="list-disc pl-8 mb-4 space-y-2">
          <li>
            🏀 <strong>Deportes:</strong> Encuentra compañeros para practicar tu
            deporte favorito.
          </li>
          <li>
            🎵 <strong>Música:</strong> Reúnete con personas que compartan tus
            gustos musicales.
          </li>
          <li>
            ✈️ <strong>Viajes:</strong> Planea tu próxima aventura con nuevos
            amigos.
          </li>
          <li>
            🎉 <strong>¡Y mucho más!</strong>
          </li>
        </ul>
        <p className="mb-4">
          Para que una actividad sea considerada <strong>activa</strong>, debe
          contar con al menos <strong>4 participantes</strong>. Una vez dentro,
          los integrantes tendrán acceso a un <strong>💬 chat grupal</strong>{" "}
          donde podrán coordinar detalles y resolver dudas con el creador de la
          actividad.
        </p>
        <p>
          🌐 <strong>Buddify</strong> es tu mejor aliado para descubrir nuevas
          experiencias, crear amistades y formar conexiones significativas en tu
          comunidad.
        </p>
      </section>

      {/* Políticas de privacidad */}
      <section className="max-w-5xl text-lg leading-relaxed bg-gray-800 shadow-lg p-8 rounded-lg mt-12">
        <h2 className="text-3xl font-semibold text-orange-400 mb-6">
          Políticas de Privacidad 🔒
        </h2>
        <p className="mb-4">
          En <strong>Buddify</strong>, valoramos tu privacidad y estamos
          comprometidos a proteger tu información. Aquí tienes los puntos más
          importantes:
        </p>
        <ul className="list-disc pl-8 mb-6 space-y-2">
          <li>
            🗂️ <strong>Recolección de datos:</strong> Recopilamos información
            básica (como tu nombre, correo y ubicación) para garantizar una
            experiencia fluida.
          </li>
          <li>
            📊 <strong>Uso de datos:</strong> Tus datos se utilizan únicamente
            para conectarte con otros usuarios y participar en actividades.
          </li>
          <li>
            🔐 <strong>Privacidad del chat:</strong> Los mensajes en los chats
            de actividades son privados y visibles solo para los participantes.
          </li>
          <li>
            🛡️ <strong>Seguridad:</strong> Implementamos medidas avanzadas para
            proteger tu información.
          </li>
          <li>
            📧 <strong>Contacto:</strong> Si tienes dudas, escríbenos a{" "}
            <a
              href="mailto:buddify907@gmail.com"
              className="text-orange-500 underline"
            >
              buddify907@gmail.com
            </a>
            .
          </li>
        </ul>
        <p>
          ✅ Al usar <strong>Buddify</strong>, aceptas estas políticas. Las
          actualizaciones se notificarán en la plataforma.
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-400">
        <p className="text-lg">
          📬 ¿Tienes algún problema o pregunta? Contáctanos en{" "}
          <a
            href="mailto:buddify907@gmail.com"
            className="text-orange-500 underline"
          >
            buddify907@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default About;
