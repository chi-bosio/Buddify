'use client';
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterForm: React.FC = () => {
  const [countries, setCountries] = useState<{ name: string, provinces: string[] }[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);

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
      setProvinces(country.provinces);
    } else {
      setProvinces([]);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      birthdate: "",
      country: "",
      province: "",
      email: "",
      username: "",
      password: "",
      nDni: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Requerido"),
      lastname: Yup.string().required("Requerido"),
      birthdate: Yup.date().required("Requerido"),
      country: Yup.string().required("Requerido"),
      province: Yup.string().required("Requerido"),
      email: Yup.string().email("Correo inválido").required("Requerido"),
      username: Yup.string().required("Requerido"),
      password: Yup.string().required("Requerido"),
      nDni: Yup.string().required("Requerido"),
    }),
    onSubmit: (values) => {
    //Logica de registro///<<<<<<<VALEN<<<<<<<<
      console.log(values);
    },
  });

  const handleResetForm = () => {
    formik.resetForm();
    setProvinces([]); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFFFC]">
      <div className="w-full max-w-4xl p-8 bg-[#FDFFFC] rounded-xl shadow-lg border border-[#D9D9D9]">
        <h1 className="text-center text-3xl font-bold mb-6 text-[#235789]">Registrarse</h1>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="space-y-6">

            <div className="relative">
              <label htmlFor="name" className="absolute -top-3 left-2 bg-[#FDFFFC] px-1 text-sm font-medium text-[#235789] mt-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789] text-[#333333]"
              />
              {formik.touched.name && formik.errors.name && <div className="text-red-600">{formik.errors.name}</div>}
            </div>

  
            <div className="relative">
              <label htmlFor="lastname" className="absolute -top-3 left-2 bg-[#FDFFFC] px-1 text-sm font-medium text-[#235789] mt-1">
                Apellido
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789] text-[#333333]"
              />
              {formik.touched.lastname && formik.errors.lastname && <div className="text-red-600">{formik.errors.lastname}</div>}
            </div>

  
            <div className="relative">
              <label htmlFor="birthdate" className="absolute -top-3 left-2 bg-[#FDFFFC] px-1 text-sm font-medium text-[#235789] mt-1">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formik.values.birthdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789] text-[#333333]"
              />
              {formik.touched.birthdate && formik.errors.birthdate && <div className="text-red-600">{formik.errors.birthdate}</div>}
            </div>


            <div className="relative">
              <label htmlFor="country" className="absolute -top-3 left-2 bg-[#FDFFFC] px-1 text-sm font-medium text-[#235789] mt-1">
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
                className="block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789] text-[#333333]"
              >
                <option value="">Seleccionar país</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {formik.touched.country && formik.errors.country && <div className="text-red-600">{formik.errors.country}</div>}
            </div>

            <div className="relative">
              <label htmlFor="province" className="absolute -top-3 left-2 bg-[#FDFFFC] px-1 text-sm font-medium text-[#235789] mt-1">
                Provincia
              </label>
              <select
                id="province"
                name="province"
                value={formik.values.province}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789] text-[#333333]"
              >
                <option value="">Seleccionar provincia</option>
                {provinces.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {formik.touched.province && formik.errors.province && <div className="text-red-600">{formik.errors.province}</div>}
            </div>
          </div>

          <div className="space-y-6">
            
            <div className="relative">
              <label htmlFor="email" className="absolute -top-3 left-2 bg-[#FDFFFC] px-1 text-sm font-medium text-[#235789] mt-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789] text-[#333333]"
              />
              {formik.touched.email && formik.errors.email && <div className="text-red-600">{formik.errors.email}</div>}
            </div>

   
            <div className="relative">
              <label htmlFor="username" className="absolute -top-3 left-2 bg-[#FDFFFC] px-1 text-sm font-medium text-[#235789] mt-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789] text-[#333333]"
              />
              {formik.touched.username && formik.errors.username && <div className="text-red-600">{formik.errors.username}</div>}
            </div>


            <div className="relative">
              <label htmlFor="password" className="absolute -top-3 left-2 bg-[#FDFFFC] px-1 text-sm font-medium text-[#235789] mt-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789] text-[#333333]"
              />
              {formik.touched.password && formik.errors.password && <div className="text-red-600">{formik.errors.password}</div>}
            </div>

      
            <div className="relative">
              <label htmlFor="nDni" className="absolute -top-3 left-2 bg-[#FDFFFC] px-1 text-sm font-medium text-[#235789] mt-1">
                DNI o pasaporte
              </label>
              <input
                type="text"
                id="nDni"
                name="nDni"
                value={formik.values.nDni}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789] text-[#333333]"
              />
              {formik.touched.nDni && formik.errors.nDni && <div className="text-red-600">{formik.errors.nDni}</div>}
            </div>
          </div>


          <div className="col-span-2 flex justify-center gap-6 mt-6">
            <button
              type="button"
              className="w-1/4 py-2 bg-[#F9A03F] text-white rounded-md hover:bg-orange-500 focus:outline-none"
              onClick={handleResetForm}
            >
              Eliminar
            </button>
            <button
              type="submit"
              className="w-1/4 py-2 bg-[#235789] text-white rounded-md hover:bg-blue-800 focus:outline-none"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
