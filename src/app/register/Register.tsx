"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import validationSchemaRegister from "./components/validationSchema";
import postData from "./components/postData";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import ErrorMessageForm from "@/components/ErrorMessageForm/ErrorMessageForm";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import InputWithLabel from "@/components/InputWithLabel/InputWithLabel";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [countries, setCountries] = useState<
    { name: string; city: string[] }[]
  >([]);
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

  const handleGoogleLogin = () => { 
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      birthdate: "",
      country: "",
      city: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      dni: "",
    },
    validationSchema: validationSchemaRegister,
    onSubmit: async (values) => {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Controla tus datos antes de registrarte",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f97316",
        cancelButtonColor: "#235789",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Registrarse",
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
        const success = await postData(values);
        Swal.close();
        if (success) {
          handleResetForm();
          router.push("/login");
        }
      }
    },
  });
  const handleResetForm = () => {
    formik.resetForm();
    setCity([]);
  };
  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] min-h-screen flex items-center justify-center bg-customPalette-white">
      <div className="w-full max-w-4xl p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">
          Registrarse
        </h1>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="relative">
              <InputWithLabel
                formik={formik}
                name="name"
                type="text"
                text="Nombre"
              />
            </div>

            <div className="relative">
              <InputWithLabel
                formik={formik}
                name="lastname"
                type="text"
                text="Apellido"
              />
            </div>

            <div className="relative">
              <InputWithLabel
                formik={formik}
                name="birthdate"
                type="date"
                text="Fecha de nacimiento"
              />
            </div>

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
                <option value="">Seleccionar país</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
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
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark mt-14"
              >
                <option value="">Seleccionar provincia</option>
                {city.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ErrorMessageForm formik={formik} input="city" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <InputWithLabel
                formik={formik}
                name="email"
                type="email"
                text="Correo electrónico"
              />
            </div>

            <div className="relative">
              <InputWithLabel
                formik={formik}
                name="username"
                type="text"
                text="Username"
              />
            </div>

            <div className="relative">
              <InputWithLabel
                formik={formik}
                name="dni"
                type="text"
                text="DNI o pasaporte"
              />
            </div>

            <div className="relative">
              <InputWithLabel
                formik={formik}
                name="password"
                type="password"
                text="Contraseña"
              />
            </div>

            <div className="relative">
              <InputWithLabel
                formik={formik}
                name="confirmPassword"
                type="password"
                text="Confirmar Contraseña"
              />
            </div>
          </div>

          <div className="mt-7 text-center">  
            <button 
              onClick={handleGoogleLogin}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Ingresa con Google
            </button>
            </div>

          <SubmitButton text="Registrarse" />

          <div className="col-span-2 text-center mt-6">
            <p className="text-sm text-customPalette-black">
              ¿Ya tenés cuenta?&nbsp;
              <a
                href="/login"
                className="text-customPalette-black hover:text-customPalette-black underline"
              >
                Inicia sesión
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
