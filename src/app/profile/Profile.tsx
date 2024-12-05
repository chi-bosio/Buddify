/* eslint-disable @next/next/no-img-element */
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
import PlansButton from "@/app/plans/PlansButton";
import { useRouter } from "next/navigation";
import moment from "moment";
import useTokenExpiration from "@/hooks/useExpirationToken";
import RedirecNotLogin from "@/components/RedirecLoader/redirectNotlogin";

interface Avatar {
  id: number;
  url: string;
}

interface Country {
  name: string;
  provinces: string[];
}

const Profile = () => {
  useTokenExpiration();
  const router = useRouter();
  const { setterAvatar } = useAuthContext();
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const { userId, setterUsername} = useAuthContext();

  useEffect(() => {
    if (userId) {
      const loadUserData = async () => {
        try {
          Swal.fire({
            title: "Cargando...",
            icon: "info",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
            {
              method: "GET",
              /*              headers: {
                "Authorization": `Bearer ${authTokens?.token}`,
              },*/
            }
          );
          const timeoutId = setTimeout(() => {
            Swal.close();
          }, 500);

          setTimeout(() => {
            clearInterval(timeoutId);
          }, 700);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          Toast(TypeToast.Error, "Error fetching user data");
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
    birthdate: userData?.birthdate
      ? moment(userData?.birthdate).format("YYYY-MM-DD")
      : "",
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
        Swal.fire({
          title: "Cargando...",
          icon: "info",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        await updateUserProfile(userId, updatedData /*, authTokens!.token*/);
        const timeoutId = setTimeout(() => {
          Swal.close();
        }, 500);

        setTimeout(() => {
          clearInterval(timeoutId);
        }, 700);
        setTimeout(() => {
          setUserData(updatedData);
          Toast(TypeToast.Success, "Perfil actualizado con exito");
          setIsEditing(false);
          setterAvatar(selectedAvatar || userData.avatar);
          setterUsername(updatedData.name);
        }, 900);
      } else {
        Toast(TypeToast.Error, "No estas logeado");
        setTimeout(() => {
          router.push("/login");
        }, 900);
      }
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

  if (!userData) return <RedirecNotLogin />;
  const eighteenYearsAgo = moment().subtract(18, "years").format("YYYY-MM-DD");
  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] min-h-screen flex items-center justify-center bg-customPalette-white">
        <RedirecNotLogin />
      <div className="w-full max-w-4xl p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">
          Perfil
        </h1>

        <PlansButton />

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
                  max={eighteenYearsAgo}
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
                    className={`${
                      !isEditing && "cursor-not-allowed opacity-80"
                    } transition-all ease-in-out duration-300 z-10 absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1`}
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
                    className={`${
                      !isEditing
                        ? "cursor-not-allowed opacity-80"
                        : "cursor-pointer"
                    }transition-all ease-in-out duration-300  block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark  `}
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
                    className={`${
                      !isEditing && "cursor-not-allowed opacity-80"
                    } transition-all ease-in-out duration-300 z-10 absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1`}
                  >
                    Provincia
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${
                      !isEditing
                        ? "cursor-not-allowed opacity-80"
                        : "cursor-pointer"
                    } transition-all ease-in-out duration-300 block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark  `}
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
                    className={`transition-all ease-in-out duration-300 w-32 h-32 mx-auto rounded-full border-2 border-customPalette-gray object-cover ${
                      !isEditing && "filter grayscale contrast-200 "
                    }`}
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {avatars.map((avatar) => (
                    <img
                      key={avatar.id}
                      src={avatar.url}
                      alt={`Avatar ${avatar.id}`}
                      onClick={
                        !isEditing
                          ? undefined
                          : () => setSelectedAvatar(avatar.url)
                      }
                      className={`w-12 h-12 rounded-full border-2 transition-all ease-in-out duration-300 filter-${
                        selectedAvatar === avatar.url
                          ? "border-customPalette-blue"
                          : "border-customPalette-gray"
                      } ${
                        !isEditing
                          ? "filter grayscale contrast-200 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                  ))}
                </div>
                {/* Botones */}
                <div className="flex items-center justify-between mt-5 w-full transition-all ease-in-out duration-300">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={handleEditClick}
                      className="w-full px-6 py-2 text-white bg-customPalette-blue rounded-md"
                    >
                      Modificar
                    </button>
                  ) : (
                    <div className="flex gap-4  w-full">
                      <button
                        type="button"
                        onClick={() => handleCancelClick(formik)}
                        className="w-full px-6 py-2 text-customPalette-white bg-customPalette-blue rounded-md transition-all ease-in-out duration-300"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className={`w-full px-6 py-2 text-customPalette-white rounded-md transition-all ease-in-out duration-300
                          ${
                            formik.dirty || selectedAvatar !== userData.avatar
                              ? "bg-customPalette-orange hover:bg-customPalette-orangebright cursor-pointer"
                              : "bg-customPalette-graydark cursor-not-allowed"
                          }`}
                      >
                        Guardar cambios
                      </button>
                    </div>
                  )}
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
