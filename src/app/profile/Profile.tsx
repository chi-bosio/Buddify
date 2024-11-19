'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import ErrorMessageForm from '../../components/ErrorMessageForm/ErrorMessageForm';

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

useEffect(() => {
const loadAvatars = async () => {
  try {
    const response = await fetch('/avatars.json');
    const data = await response.json();
    setAvatars(data.avatars);
  } catch (error) {
    console.error('Error loading avatars:', error);
  }
};

const loadCountries = async () => {
  try {
    const response = await fetch('/paises.data.json');
    const data = await response.json();
    const countryData: Country[] = data.countries.map((country: any) => ({
      name: country.name,
      provinces: country.city,
    }));
    setCountries(countryData);
  } catch (error) {
    console.error('Error loading countries data:', error);
  }
};

loadAvatars();
loadCountries();
}, []);

const validationSchema = Yup.object({
name: Yup.string().required('El nombre es obligatorio'),
lastname: Yup.string().required('El apellido es obligatorio'),
birthdate: Yup.date().required('La fecha de nacimiento es obligatoria'),
country: Yup.string().required('El país es obligatorio'),
city: Yup.string().required('La provincia es obligatoria'),
});

const initialValues = {
name: '',
lastname: '',
birthdate: '',
country: '',
city: '',
};

const handleSubmit = (values: any) => {
console.log('Datos del formulario:', values);
setIsEditing(false);
};

const handleEditClick = () => {
setIsEditing(true);
};

const handleCancelClick = (formik: FormikProps<any>) => {
formik.resetForm();
setAvailableCities([]);
setIsEditing(false);
};

const handleCountryChange = (
event: React.ChangeEvent<HTMLSelectElement>,
formik: FormikProps<any>
) => {
const selectedCountry = event.target.value;
const country = countries.find((c) => c.name === selectedCountry);
setAvailableCities(country?.provinces || []);
formik.setFieldValue('country', selectedCountry);
formik.setFieldValue('city', '');
};

return (
<div className="bg-[url('/assets/textura-fondo.avif')] min-h-screen flex items-center justify-center bg-customPalette-white">
  <div className="w-full max-w-4xl p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
    <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">Perfil</h1>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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

{/* País */}
<div className="relative">
  <label
    htmlFor="country"
    className="absolute top-0 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1 z-10"
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
    className={`block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark ${
      !isEditing ? 'bg-gray-100 cursor-not-allowed' : ''
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
    className="absolute top-0 left-2 bg-[var(--custom-white)] px-1 text-sm font-medium text-[var(--custom-blue)] mt-1 z-10"
  >
    Provincia
  </label>
  <select
    id="city"
    name="city"
    value={formik.values.city}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className={`block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark ${
      (!isEditing || availableCities.length === 0) ? 'bg-gray-100 cursor-not-allowed' : ''
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
                className="px-6 py-2 text-customPalette-blue bg-customPalette-white border border-customPalette-blue rounded-md"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Avatares */}
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-4 text-customPalette-blue">Seleccionar Avatar</h2>
        <div className="mb-4">
          <img
            src={selectedAvatar || 'https://via.placeholder.com/150?text=Selecciona+un+Avatar'}
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
                  ? 'border-customPalette-blue'
                  : 'border-transparent'
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
