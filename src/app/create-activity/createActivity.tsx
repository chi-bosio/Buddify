"use client";
import { useState, useEffect } from "react";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  Navigation2Icon,
} from "lucide-react";
import { useFormik } from "formik";
import moment from "moment";
import DragAndDropImage from "./components/dragAndDrop";
import { PostData } from "./components/postData";
import { UploadImageToCloudinary } from "./components/uploadImageToCloudinary";
import validationSchemaNewActivitie from "./components/validationSchema";
import InputWithLabel from "@/components/InputWithLabel/InputWithLabel";
import ErrorMessageForm from "@/components/ErrorMessageForm/ErrorMessageForm";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import Swal from "sweetalert2";
import Toast, { TypeToast } from "@/components/Toast/Toast";
import MapForm from "@/app/create-activity/components/MapForm/MapForm";
import { useAuthContext } from "@/hooks/authContext";
import GetCategories from "@/components/GetCategories/GetCategories";
import { useRouter } from "next/navigation";
import PlansButton from "../plans/PlansButton";
import { Preahvihear } from "next/font/google";

interface FormValues {
  name: string;
  description: string;
  image: File | null;
  date: string;
  time: string;
  place: string;
  categoryId: string;
}

export default function CreateActivityForm() {
  const router = useRouter();
  const { userId, isPremium } = useAuthContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [isLimitReached, setIsLimitReached] = useState<boolean>(false);
  const [premium, setPremium] = useState<boolean>(false);

  useEffect(() => {
    if (isPremium) {
      setPremium(isPremium);
    }
  }, [isPremium]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  // Verificar cuántas actividades ha creado el usuario y si ha alcanzado el límite
  useEffect(() => {
    const checkActivitiesLimit = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/activities/count-created?userId=${userId}`
        );
        const data = await response.json();
        if (data && data.count !== undefined) {
          setIsLimitReached(data.count >= 3); // Aquí 3 es el límite de actividades para usuarios no premium
        }
      } catch (error) {
        console.error("Error al verificar el límite de actividades", error);
      }
    };

    if (userId) {
      checkActivitiesLimit();
    }
  }, [userId, isPremium]);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      description: "",
      image: null,
      date: "",
      time: "",
      place: "",
      categoryId: "",
    },
    validationSchema: validationSchemaNewActivitie,
    onSubmit: async (values, { resetForm }) => {
      console.log(isLimitReached, premium);
      if (isLimitReached && !premium) {
        // Mostrar el mensaje de SweetAlert2
        Swal.fire({
          title: "¡Límite alcanzado!",
          text: "Has alcanzado el límite de actividades creadas este mes. ¡Hazte Premium y crea más actividades!",
          icon: "info",
          showCancelButton: true,
          cancelButtonText: "Cerrar",
          confirmButtonText: "Ir a Premium",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir a la página de Premium si el usuario decide pasarse
            router.push("/plans");
          }
        });
        return;
      } else {
        Swal.fire({
          title: "Cargando...",
          icon: "info",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        let imageUrl = "";
        if (values.image) {
          imageUrl = await UploadImageToCloudinary(values.image);
          if (!imageUrl) {
            const timeoutId = setTimeout(() => {
              Swal.close();
            }, 500);

            setTimeout(() => {
              clearInterval(timeoutId);
            }, 700);
            Toast(
              TypeToast.Error,
              "No se pudo subir la imagen. Verifica e intenta nuevamente."
            );
            return;
          }
        }

        const activityData = {
          ...values,
          creatorId: userId,
          image: imageUrl,
          latitude: String(location.lat),
          longitude: String(location.lng),
        };

        const isSuccess = await PostData(activityData);

        const timeoutId = setTimeout(() => {
          Swal.close();
        }, 500);

        setTimeout(() => {
          clearInterval(timeoutId);
        }, 700);
        if (isSuccess) {
          setTimeout(() => {
            resetForm();
            setImagePreview(null);
            router.push("/my-activities");
          }, 900);
        }
      }
    },
  });

  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] min-h-screen flex items-center justify-center bg-customPalette-white">
      <div className="w-full max-w-4xl p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-gray">
        <PlansButton />
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">
          Crear Nueva Actividad
        </h1>
        {/* Mostrar un mensaje si el límite ha sido alcanzado */}
        {isLimitReached && !premium && (
          <div className="bg-red-100 text-red-800 text-center p-2 rounded-lg mb-4">
            Has alcanzado el límite de actividades GRATUITAS creadas este mes.
          </div>
        )}
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col lg:flex-row gap-5"
        >
          <div className="flex items-center justify-center flex-col w-full pt-3">
            <div className="relative w-full">
              <InputWithLabel
                formik={formik}
                name="name"
                type="text"
                text="Nombre de la Actividad"
              />
            </div>

            <div className="relative w-full">
              <GetCategories formik={formik} />
              <ErrorMessageForm formik={formik} input="categoryId" />
            </div>

            <div className="relative w-full">
              <label
                htmlFor="description"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Descripción
              </label>
              <textarea
                onBlur={formik.handleBlur}
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                rows={3}
                className="resize-none mt-1 block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
              />
              <ErrorMessageForm formik={formik} input="description" />
            </div>

            {/* Resto del formulario */}
            <div className="relative w-full">
              <label
                htmlFor="image-upload"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Imagen de la Actividad
              </label>
              <DragAndDropImage
                onImageUpload={(file) => {
                  formik.setFieldTouched("image", true, true);
                  formik.setFieldValue("image", file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setImagePreview(reader.result as string);
                    reader.readAsDataURL(file);
                  } else {
                    setImagePreview(null);
                  }
                }}
              />
              <ErrorMessageForm formik={formik} input="image" />
            </div>

            <div className="relative w-full">
              <InputWithLabel
                formik={formik}
                name="date"
                type="date"
                text="Fecha de la Actividad"
              />
            </div>

            <div className="relative w-full">
              <InputWithLabel
                formik={formik}
                name="time"
                type="time"
                text="Hora de la Actividad"
              />
            </div>

            <div className="relative w-full">
              <InputWithLabel
                formik={formik}
                name="place"
                type="text"
                text="Lugar de la Actividad"
              />
            </div>
          </div>
          <div className="flex items-start justify-center flex-col w-full">
            <div className="relative w-full">
              <label
                htmlFor="place"
                className="-top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Ubicacion
              </label>
              <MapForm onLocationSelect={handleLocationSelect} />
              <div className="text-customPalette-red h-0.5 mt-1 mb-10">
                Si no cambias este campo, se tomara tu dirección actual
              </div>
            </div>
            <div className="flex-1 mt-5">
              <h2 className="text-xl font-bold mb-4 text-customPalette-blue">
                Vista Previa
              </h2>
              <div className="bg-customPalette-white rounded-lg shadow-md overflow-hidden">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-customPalette-bluedark mb-2">
                    {formik.values.name || "Nombre de la Actividad"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {formik.values.description || "Descripción de la actividad"}
                  </p>
                  <div className="flex items-center text-customPalette-graydark mb-2">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>
                      {formik.values.date
                        ? moment(formik.values.date, "YYYY-MM-DD").format(
                            "DD/MM/YYYY"
                          )
                        : "Fecha"}
                    </span>
                  </div>
                  <div className="flex items-center text-customPalette-graydark mb-2">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>{formik.values.time || "Hora"}</span>
                  </div>
                  <div className="flex items-center text-customPalette-graydark mb-2">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span>{formik.values.place || "Lugar"}</span>
                  </div>
                  <div className="flex items-center text-customPalette-graydark mb-2">
                    <Navigation2Icon className="w-4 h-4 mr-2" />
                    <span>
                      {location.lat && location.lng
                        ? `${location.lat} ${location.lng}`
                        : "Ubicación"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <SubmitButton text="Crear Actividad" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
