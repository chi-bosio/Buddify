'use client';
import React, { useState, useEffect } from 'react';


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
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    birthdate: '',
    country: '',
    city: '',
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [initialUserData, setInitialUserData] = useState(userData); 
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


  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    const country = countries.find((c) => c.name === selectedCountry);
    setAvailableCities(country?.provinces || []); 
    setUserData((prevState) => ({
      ...prevState,
      country: selectedCountry,
      city: '', 
    }));
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Contraseña actualizada:', passwordData.newPassword);
  };

 
  const handleEditClick = () => {
    setInitialUserData(userData); 
    setIsEditing(true);
  };


  const handleSaveClick = () => {
    setIsEditing(false);
    console.log('Datos guardados:', userData);
  };


  const handleCancelClick = () => {
    setUserData(initialUserData); 
    setIsEditing(false); 
  };

  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] min-h-screen flex items-center justify-center bg-customPalette-white">
      <div className="w-full max-w-4xl p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">Perfil</h1>

        <div className="grid grid-cols-2 gap-6">
          {/* Formulario */}
          <div className="space-y-6">
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-customPalette-blue mb-1"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-customPalette-blue mb-1"
              >
                Apellido
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={userData.lastname}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium text-customPalette-blue mb-1"
              >
                Fecha de nacimiento
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={userData.birthdate}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-customPalette-blue mb-1"
              >
                País
              </label>
              <select
                id="country"
                name="country"
                value={userData.country}
                onChange={handleCountryChange}
                disabled={!isEditing}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue"
              >
                <option value="">Seleccionar país</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-customPalette-blue mb-1"
              >
                Provincia
              </label>
              <select
                id="city"
                name="city"
                value={userData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue"
              >
                <option value="">Seleccionar provincia</option>
                {availableCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

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
                <>
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    className="px-6 py-2 text-white bg-customPalette-blue rounded-md"
                  >
                    Guardar cambios
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="px-6 py-2 text-white bg-customPalette-red rounded-md"
                  >
                    Cancelar
                  </button>
                </>
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
                  className={`w-12 h-12 rounded-full cursor-pointer border-2 ${selectedAvatar === avatar.url ? 'border-customPalette-blue' : 'border-transparent'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Cambiar contraseña */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-customPalette-blue">Cambiar Contraseña</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm text-customPalette-blue">Contraseña actual</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-customPalette-gray rounded-md focus:ring-customPalette-blue"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm text-customPalette-blue">Nueva contraseña</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-customPalette-gray rounded-md focus:ring-customPalette-blue"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-customPalette-blue">Confirmar nueva contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-customPalette-gray rounded-md focus:ring-customPalette-blue"
              />
            </div>
            <div className="flex justify-between">
              <button type="submit" className="px-6 py-2 bg-customPalette-blue text-white rounded-md">Cambiar contraseña</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
