'use client';
import { useState } from "react";
import { CalendarIcon, ClockIcon, MapPinIcon, Navigation2Icon } from "lucide-react";
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
import MapForm from "@/components/MapForm/MapForm";

interface FormValues {
  name: string;
  description: string;
  image: File | null;
  date: string;
  time: string;
  place:string;
}

export default function CreateActivityForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      description: "",
      image: null,
      date: "",
      time: "",
      place:"",
    },
    validationSchema: validationSchemaNewActivitie,
    onSubmit: async (values, { resetForm }) => {
      Swal.fire({
        title: 'Cargando...',
        icon:"info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      });
      let imageUrl = '';
      if (values.image) {
        imageUrl = await UploadImageToCloudinary(values.image);
        if (!imageUrl) {
          Swal.close();
          Toast(TypeToast.Error,"No se pudo subir la imagen. Verifica e intenta nuevamente.");
          return;
        }
      }
    
      const activityData = {
        ...values,
        creatorId:"8fd830f4-55a7-4e62-86d4-94f6efed3d92",
        image: imageUrl,
        latitude:String(location.lat),
        longitude:String(location.lng),
      };
      
      const isSuccess = await PostData(activityData);
      Swal.close();
      if (isSuccess) {
  
        resetForm();
        setImagePreview(null);
      }
    },
  });
  
  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] min-h-screen flex items-center justify-center bg-customPalette-white">
      <div className="w-full max-w-4xl p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-gray">
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">
          Crear Nueva Actividad
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <form onSubmit={formik.handleSubmit} className="flex-1 space-y-4">
            <div className="relative">
              <InputWithLabel 
                formik={formik}
                name="name"
                type="text"
                text="Nombre de la Actividad"
              />
            </div>

            <div className="relative">
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
                className="mt-1 block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
              />
             <ErrorMessageForm formik={formik} input="description"/>
            
            </div>

            <div className="relative">
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
                    reader.onloadend = () => setImagePreview(reader.result as string);
                    reader.readAsDataURL(file);
                  } else {
                    setImagePreview(null);
                  }
                }
              } 
              />
            </div>

            <div className="relative">
              <InputWithLabel 
                formik={formik}
                name="date"
                type="date"
                text="Fecha de la Actividad"
              />
            </div>

            <div className="relative">
              <InputWithLabel 
                formik={formik}
                name="time"
                type="time"
                text="Hora de la Actividad"
              />
            </div>

            <div className="relative">
              <InputWithLabel 
                formik={formik}
                name="place"
                type="text"
                text="Lugar de la Actividad"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="place"
                className="-top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Ubicacion
              </label>
              <MapForm onLocationSelect={handleLocationSelect} />
              <div className="text-customPalette-red h-0.5 mt-1 mb-10">
                Si no cambias este campo , se tomara tu direccion actual
              </div>
            </div>
            <div>
            
        </div>
            <div className="flex justify-center items-center mt-1">
              <SubmitButton text="Crear Actividad"/>
            </div>
          </form>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 text-customPalette-blue">
              Vista Previa
            </h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                <div className="flex items-center text-gray-500 mb-2">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>
                    {formik.values.date
                      ? moment(formik.values.date, "YYYY-MM-DD").format("DD/MM/YYYY")
                      : "Fecha"}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>{formik.values.time || "Hora"}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span>{formik.values.place  || "Lugar"}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <Navigation2Icon className="w-4 h-4 mr-2" />
                  <span>{location.lat && location.lng ? `${location.lat} ${location.lng}` : "Ubicación"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
