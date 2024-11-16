"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import validationSchemaRegister  from "./components/validationSchema";
import postData from "./components/postData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const RegisterForm: React.FC = () => {
  const [countries, setCountries] = useState<{ name: string, city: string[] }[]>([]);
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
      name: "",
      lastname: "",
      birthdate: "",
      country: "",
      city: "",
      email: "",
      username: "",
      password: "",
      dni: "",
    },
    validationSchema:validationSchemaRegister ,
    onSubmit: async (values) => {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Controla tus datos antes de registrarte",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f97316",
        cancelButtonColor: "#235789",
        cancelButtonText:"Cancelar",
        confirmButtonText: "Registrarse"
      });
      if(result.isConfirmed) {
        const success = await postData(values);
        if (success) handleResetForm();
      }     
      }
  });
  const handleResetForm = () => {
    formik.resetForm();
    setCity([]);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] min-h-screen flex items-center justify-center bg-customPalette-white">
      <div className="w-full max-w-4xl p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">
          Registrarse
        </h1>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-customPalette-red">
                  {formik.errors.name}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="lastname"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Apellido
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className="text-customPalette-red">
                  {formik.errors.lastname}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="birthdate"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Fecha de nacimiento
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formik.values.birthdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
              />
              {formik.touched.birthdate && formik.errors.birthdate && (
                <div className="text-customPalette-red">
                  {formik.errors.birthdate}
                </div>
              )}
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
              {formik.touched.country && formik.errors.country && (
                <div className="text-customPalette-red">
                  {formik.errors.country}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="city"
                className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1"
              >
                Ciudad
              </label>
              <select
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
              >
                <option value="">Seleccionar ciudad</option>
                {city.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {formik.touched.city && formik.errors.city && (
                <div className="text-[var(--custom-red)]">
                  {formik.errors.city}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label
                htmlFor="email"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-customPalette-red">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="username"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-customPalette-red">
                  {formik.errors.username}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Contraseña
              </label>

              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-2 top-1"
              >
                <img
                  src={showPassword ? "/assets/ojosabierto.png" : "/assets/ojoscerrado.png"}
                  alt={showPassword ? "Ojo cerrado" : "Ojo abierto"}
                  className="w-9 h-9"
                />
                </button>

              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark pr-12"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-customPalette-red">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="dni"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                DNI o pasaporte
              </label>
              <input
                type="text"
                id="dni"
                name="dni"
                value={formik.values.dni}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
              />
              {formik.touched.dni && formik.errors.dni && (
                <div className="text-customPalette-red">
                  {formik.errors.dni}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2 flex justify-center gap-6 mt-6">
            <button
              type="submit"
              className="w-1/4 py-2 bg-customPalette-orange text-customPalette-white rounded-md hover:bg-customPalette-orangebright focus:outline-none"
            >
              Registrarse
            </button>
          </div>

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


