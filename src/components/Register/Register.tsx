"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import validationSchemaRegister  from "./components/validationSchema";
import postData from "./components/postData";

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
      if(confirm("¿Revisaste todos los campos capo?"))
        postData(values);
    },
    
  });
  const handleResetForm = () => {
    formik.resetForm();
    setCity([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--custom-white)]">
      <div className="w-full max-w-4xl p-8 bg-[var(--custom-white)] rounded-xl shadow-lg border border-[var(--custom-white)]">
        <h1 className="text-center text-3xl font-bold mb-6 text-[var(--custom-blue)]">
          Registrarse
        </h1>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1"
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
                className="block w-full p-2 border border-[var(--custom-gray)] rounded-md shadow-sm focus:ring-[var(--custom-blue)] focus:border-[var(--custom-blue)] text-[var(--custom-gray-dark)]"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-[var(--custom-red)]">
                  {formik.errors.name}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="lastname"
                className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1"
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
                className="block w-full p-2 border border-[var(--custom-gray)] rounded-md shadow-sm focus:ring-[var(--custom-blue)] focus:border-[var(--custom-blue)] text-[var(--custom-gray-dark)]"
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className="text-[var(--custom-red)]">
                  {formik.errors.lastname}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="birthdate"
                className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1"
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
                className="block w-full p-2 border border-[var(--custom-gray)] rounded-md shadow-sm focus:ring-[var(--custom-blue)] focus:border-[var(--custom-blue)] text-[var(--custom-gray-dark)]"
              />
              {formik.touched.birthdate && formik.errors.birthdate && (
                <div className="text-[var(--custom-red)]">
                  {formik.errors.birthdate}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="country"
                className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1"
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
                className="block w-full p-2 border border-[var(--custom-gray)] rounded-md shadow-sm focus:ring-[var(--custom-blue)] focus:border-[var(--custom-blue)] text-[var(--custom-gray-dark)]"
              >
                <option value="">Seleccionar país</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {formik.touched.country && formik.errors.country && (
                <div className="text-[var(--custom-red)]">
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
                className="block w-full p-2 border border-[var(--custom-gray)] rounded-md shadow-sm focus:ring-[var(--custom-blue)] focus:border-[var(--custom-blue)] text-[var(--custom-gray-dark)]"
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
                className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1"
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
                className="block w-full p-2 border border-[var(--custom-gray)] rounded-md shadow-sm focus:ring-[var(--custom-blue)] focus:border-[var(--custom-blue)] text-[var(--custom-gray-dark)]"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-[var(--custom-red)]">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="username"
                className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1"
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
                className="block w-full p-2 border border-[var(--custom-gray)] rounded-md shadow-sm focus:ring-[var(--custom-blue)] focus:border-[var(--custom-blue)] text-[var(--custom-gray-dark)]"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-[var(--custom-red)]">
                  {formik.errors.username}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-[var(--custom-gray)] rounded-md shadow-sm focus:ring-[var(--custom-blue)] focus:border-[var(--custom-blue)] text-[var(--custom-gray-dark)]"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-[var(--custom-red)]">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="dni"
                className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1"
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
                className="block w-full p-2 border border-[var(--custom-gray)] rounded-md shadow-sm focus:ring-[var(--custom-blue)] focus:border-[var(--custom-blue)] text-[var(--custom-gray-dark)]"
              />

              {formik.touched.dni && formik.errors.dni && <div className="text-[var(--custom-red)]">{formik.errors.dni}</div>}

            </div>
          </div>

          <div className="col-span-2 flex justify-center gap-6 mt-6">
            <button
              type="button"
              className="w-1/4 py-2 bg-[var(--custom-orange)] text-var(--background) rounded-md hover:bg-var(--custom-orange-500) focus:outline-none"
              onClick={handleResetForm}
            >
              Eliminar
            </button>
            <button
              type="submit"
              className="w-1/4 py-2 bg-[var(--custom-blue)] text-var(--background) rounded-md hover:bg-var(--custom-blue-800) focus:outline-none"
            >
              Registrarse
            </button>
          </div>

          <div className="col-span-2 text-center mt-6">
            <p className="text-sm text-[var(--custom-black)]">
              ¿Ya tenés cuenta?
              <a
                href="/login"
                className="text-[var(--custom-black)] hover:text-[var(--custom-black)] underline"
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


