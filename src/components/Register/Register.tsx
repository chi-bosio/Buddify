const RegisterForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFFFC]">
      <div className="w-full max-w-4xl p-8 bg-[#FDFFFC] rounded-xl shadow-lg border border-[#D9D9D9]">
        <h1 className="text-center text-3xl font-bold mb-6 text-[#235789]">
          Registrarse
        </h1>
        <form className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#235789]"
              >
                Nombre
              </label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-[#235789]"
              >
                Apellido
              </label>
              <input
                type="text"
                name="lastname"
                required
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
              />
            </div>

            <div>
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium text-[#235789]"
              >
                Fecha de nacimiento
              </label>
              <input
                type="date"
                name="birthdate"
                required
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-[#235789]"
              >
                País
              </label>
              <input
                type="text"
                name="country"
                required
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-[#235789]"
              >
                Ciudad
              </label>
              <input
                type="text"
                name="city"
                required
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#235789]"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#235789]"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#235789]"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
              />
            </div>

            <div>
              <label
                htmlFor="nDni"
                className="block text-sm font-medium text-[#235789]"
              >
                DNI o pasaporte
              </label>
              <input
                type="text"
                name="nDni"
                required
                className="mt-1 block w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:ring-[#235789] focus:border-[#235789]"
              />
            </div>
          </div>

          <div className="col-span-2 flex justify-center gap-6 mt-6">
            <button
              type="button"
              className="w-1/4 py-2 bg-[#F9A03F] text-white rounded-md hover:bg-orange-500 focus:outline-none"
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
