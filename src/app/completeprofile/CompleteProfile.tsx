"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import validationSchemaCompleteProfile from "./components/validationSchema";
import postData from "./components/postData";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import ErrorMessageForm from "@/components/ErrorMessageForm/ErrorMessageForm";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import InputWithLabel from "@/components/InputWithLabel/InputWithLabel";
import { useAuthContext } from "@/hooks/authContext";
import moment from "moment";

const CompleteProfile: React.FC = () => {
  const router = useRouter();
  const { userId } = useAuthContext();
  const [countries, setCountries] = useState<{ name: string; city: string[] }[]>([]);
  const [city, setCity] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./paises.data.json");
      const data = await response.json();
      setCountries(data.countries);
    };

    fetchData();
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = event.target.value;
    const country = countries.find((c) => c.name === countryName);
    if (country) {
      setCity(country.city);
    } else {
      setCity([]);
    }
  };

  const formik = useFormik({
    initialValues: {
      country: "",
      city: "",
      birthdate: "",
      dni: "",
    },
    validationSchema: validationSchemaCompleteProfile,
    onSubmit: async (values) => {
      try {
        const result = await Swal.fire({
          title: "¿Estás seguro?",
          text: "Revisa los datos antes de completar tu perfil",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f97316",
          cancelButtonColor: "#235789",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Completar perfil",
        });

        if (result.isConfirmed) {
          Swal.fire({
            title: "Cargando...",
            icon: "info",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          
          const success = await postData({ ...values, userId: userId || undefined });

          const timeoutId = setTimeout(() => {
            Swal.close();
          }, 500);
          setTimeout(() => {
            clearInterval(timeoutId); 
          }, 700);
          if (success) {
            setTimeout(() => {
              formik.resetForm();
              router.push("/");
            }, 900);
          }
        } 
      } catch (error) {
        const timeoutId = setTimeout(() => {
          Swal.close();
        }, 500);
  
        setTimeout(() => {
          clearInterval(timeoutId); 
        }, 700);
        Swal.fire({
          title: "Error inesperado",
          text: "Ocurrió un error al completar el perfil. Inténtalo nuevamente.",
          icon: "error",
          confirmButtonColor: "#f97316",
        });
        console.error("Error al enviar datos:", error);
      }
    },
  });
  const eighteenYearsAgo = moment().subtract(18, 'years').format('YYYY-MM-DD');
  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] min-h-screen flex items-center justify-center bg-customPalette-white">
      <div className="w-full max-w-4xl p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">
          Completar Perfil
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 justify-center items-center">
          <div className="flex justify-center items-center gap-6 ">
            <div className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="birthdate"
                  className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
                >
                  Fecha de nacimiento
                </label>
                <input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  value={formik.values.birthdate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  max={eighteenYearsAgo}
                  className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
                />
                <ErrorMessageForm formik={formik} input="birthdate" />
              </div>
              <div className="relative">
                <InputWithLabel
                  formik={formik}
                  name="dni"
                  type="text"
                  text="DNI o pasaporte"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="country"
                  className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
                >
                  País
                </label>
                <select
                  id="country"
                  name="country"
                  value={formik.values.country}
                  onChange={(event) => {
                    formik.handleChange(event);
                    handleCountryChange(event);
                  }}
                  onBlur={formik.handleBlur}
                  className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
                >
                  <option value="" className="text-customPalette-graydark">Seleccionar país</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.name} className="text-customPalette-graydark">
                      {country.name}
                    </option>
                  ))}
                </select>
                <ErrorMessageForm formik={formik} input="country" />
              </div>

              <div className="relative">
                <label
                  htmlFor="city"
                  className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1"
                >
                  Provincia
                </label>
                <select
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
                >
                  <option value="" className="text-customPalette-graydark">Seleccionar ciudad</option>
                  {city.map((city, index) => (
                    <option key={index} value={city} className="text-customPalette-graydark">
                      {city}
                    </option>
                  ))}
                </select>
                <ErrorMessageForm formik={formik} input="city" />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <SubmitButton text="Completar perfil" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
