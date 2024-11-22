"use client";

import { useState, useEffect } from "react";
import { Formik, Form, FormikProps } from "formik";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import ErrorMessageForm from "../../components/ErrorMessageForm/ErrorMessageForm";
import validationSchema from "./components/validationSchema";
import { useAuthContext } from "../../contexts/authContext";
import { updateUserProfile } from "./components/postData";
import Swal from "sweetalert2";
import Toast, { TypeToast } from "@/components/Toast/Toast";

interface Avatar {
  id: number;
  url: string;
}

interface Country {
  name: string;
  provinces: string[];
}

const Profile: React.FC = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const { userId } = useAuthContext();

  useEffect(() => {
    if (userId) {
      const loadUserData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
          );
          const data = await response.json();
          console.log("User data:", data);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      loadUserData();
    }
  }, [userId]);

  useEffect(() => {
    const loadAvatars = async () => {
      try {
        const response = await fetch("/avatars.json");
        const data = await response.json();
        setAvatars(data.avatars);
      } catch (error) {
        console.error("Error loading avatars:", error);
      }
    };

    const loadCountries = async () => {
      try {
        const response = await fetch("/paises.data.json"); // Ruta al JSON de países
        const data = await response.json();
        const countryData: Country[] = data.countries.map((country: any) => ({
          name: country.name,
          provinces: country.city,
        }));
        setCountries(countryData);

        // Cargar provincias si el usuario ya tiene un país seleccionado
        if (userData && userData.country) {
          const selectedCountry = countryData.find(
            (c) => c.name === userData.country
          );
          setAvailableCities(selectedCountry?.provinces || []);
        }
      } catch (error) {
        console.error("Error loading countries data:", error);
      }
    };

    loadAvatars();
    loadCountries();
  }, [userData]);

  const initialValues = {
    name: userData?.name || "",
    lastname: userData?.lastname || "",
    birthdate: userData?.birthdate || "",
    dni: userData?.dni || "",
    country: userData?.country || "",
    city: userData?.city || "",
  };

  const handleSubmit = async (values: any) => {
    const updatedData = {
      ...values,
      avatar: selectedAvatar || userData.avatar,
    };

    const result = await Swal.fire({
      title: "¿Guardar cambios?",
      text: "Estás a punto de actualizar tu perfil. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#235789",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      if (userId) {
        await updateUserProfile(userId, updatedData);
      } else {
        console.error("User ID is null");
      }

      setUserData(updatedData);
      Toast(TypeToast.Success, "Perfil actualizado con exito");
      setIsEditing(false);
    } catch (error) {
      Toast(TypeToast.Error, "Error al actualizar el perfil");
    }
  };

  const handleEditClick = () => {
    if (userData?.country) {
      const selectedCountry = countries.find(
        (c) => c.name === userData.country
      );
      setAvailableCities(selectedCountry?.provinces || []);
    }
    setIsEditing(true);
  };

  const handleCancelClick = (formik: FormikProps<any>) => {
    formik.resetForm();
    if (userData?.country) {
      const selectedCountry = countries.find(
        (c) => c.name === userData.country
      );
      setAvailableCities(selectedCountry?.provinces || []);
    } else {
      setAvailableCities([]);
    }
    setIsEditing(false);
  };

  const handleCountryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    formik: FormikProps<any>
  ) => {
    const selectedCountry = event.target.value;
    const country = countries.find((c) => c.name === selectedCountry);
    setAvailableCities(country?.provinces || []);
    formik.setFieldValue("country", selectedCountry);
    formik.setFieldValue("city", "");
  };

  if (!userData) return null;

  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] min-h-screen flex items-center justify-center bg-customPalette-white">
      <div className="w-full max-w-4xl p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">
          Perfil
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Nombre */}
                <InputWithLabel
                  name="name"
                  type="text"
                  formik={formik}
                  text="Nombre"
                  disabled={!isEditing}
                />

                {/* Apellido */}
                <InputWithLabel
                  name="lastname"
                  type="text"
                  formik={formik}
                  text="Apellido"
                  disabled={!isEditing}
                />

                {/* Fecha de nacimiento */}
                <InputWithLabel
                  name="birthdate"
                  type="date"
                  formik={formik}
                  text="Fecha de nacimiento"
                  disabled={!isEditing}
                />

                {/* DNI */}
                <InputWithLabel
                  name="dni"
                  type="text"
                  formik={formik}
                  text="DNI"
                  disabled={!isEditing}
                />

                {/* País */}
                <div className="relative">
                  <label
                    htmlFor="country"
                    className={`absolute left-3 px-1 text-sm font-medium transition-all 
                   ${
                     formik.values.country
                       ? "-top-2 bg-white"
                       : "top-3 text-gray-500"
                   }`}
                  >
                    País
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formik.values.country}
                    onChange={(event) => {
                      formik.handleChange(event);
                      handleCountryChange(event, formik);
                    }}
                    onBlur={formik.handleBlur}
                    className={`block w-full p-2 pt-6 pb-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue${
                      !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    disabled={!isEditing}
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

                {/* Provincia */}
                <div className="relative">
                  <label
                    htmlFor="city"
                    className={`absolute left-3 px-1 text-sm font-medium transition-all 
                  ${
                    formik.values.city
                      ? "-top-2 bg-white"
                      : "top-3 text-gray-500"
                  }`}
                  >
                    Provincia
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`block w-full p-2 pt-6 pb-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue ${
                      !isEditing || availableCities.length === 0
                        ? "bg-gray-100 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={!isEditing || availableCities.length === 0}
                  >
                    <option value="">Seleccionar provincia</option>
                    {availableCities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ErrorMessageForm formik={formik} input="city" />
                </div>

                {/* Botones */}
                <div className="flex justify-between mt-4">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={handleEditClick}
                      className="px-6 py-2 text-white bg-customPalette-blue rounded-md"
                    >
                      Modificar
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="px-6 py-2 text-white bg-customPalette-blue rounded-md"
                      >
                        Guardar cambios
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCancelClick(formik)}
                        className="px-6 py-2 text-white bg-red-500 rounded-md"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Avatar */}
              <div className="text-center">
                <h2 className="text-lg font-semibold text-customPalette-blue">
                  Seleccionar Avatar
                </h2>
                <div className="mb-4">
                  <img
                    src={selectedAvatar || userData.avatar}
                    alt="Avatar seleccionado"
                    className="w-32 h-32 mx-auto rounded-full border-2 border-customPalette-gray object-cover"
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {avatars.map((avatar) => (
                    <img
                      key={avatar.id}
                      src={avatar.url}
                      alt={`Avatar ${avatar.id}`}
                      onClick={() => setSelectedAvatar(avatar.url)}
                      className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                        selectedAvatar === avatar.url
                          ? "border-customPalette-blue"
                          : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
