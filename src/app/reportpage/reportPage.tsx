"use client";

import { useParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import validationSchema from "./components/validationSchema";
import Swal from "sweetalert2";
import { useAuthContext } from "@/contexts/authContext";

export default function ReportPage() {
  const { activityId } = useParams() || {};
  const { userId } = useAuthContext();

  const [creatorName, setCreatorName] = useState<string>("Cargando...");
  const [creatorLastname, setCreatorLastname] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setCreatorName(searchParams.get("creatorName") || "Desconocido");
      setCreatorLastname(searchParams.get("creatorLastname") || "");
    }
  }, []);

  const handleSubmit = async (
    values: { description: string },
    { resetForm }: any
  ) => {
    try {
      const reportData = {
        activityId,
        creatorName,
        creatorLastname,
        reporterId: userId,
        description: values.description,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reports`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reportData),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Reporte Enviado",
          text: "Nuestros moderadores revisarán el reporte y tomarán las acciones necesarias.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          resetForm();
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un error al enviar el reporte. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire({
        title: "Error",
        text: "Error al enviar el reporte. Por favor, inténtalo más tarde.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  if (!activityId) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-lg w-full bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reportar Actividad
        </h1>
        <div className="space-y-4">
          <div>
            <p className="text-lg text-customPalette-black">
              Estás reportando la actividad con ID:{" "}
              <span className="font-semibold text-red-500">{activityId}</span>
            </p>
            <p className="mt-2 text-customPalette-black">
              <span className="font-semibold text-customPalette-graydark">Creador:</span>{" "}
              {creatorName} {creatorLastname}
            </p>
          </div>

          {/* Formulario */}
          <Formik
            initialValues={{ description: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Descripción del problema:
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    id="description"
                    className="text-customPalette-graydark resize-none w-full h-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 border-gray-300"
                    placeholder="Describe el problema con la actividad..."
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-customPalette-orange text-customPalette-white px-6 py-3 rounded-md shadow-md hover:bg-customPalette-orangebright duration-300 ease-in-out w-full"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Reporte"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
