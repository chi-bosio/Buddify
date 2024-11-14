const LoginForm = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
        <div className="md:col-span-2 bg-cover bg-center h-full" style={{ backgroundImage: 'url(/assets/fondoLanding.png)' }}></div>
  
        <div className="flex justify-center items-center h-full">
          <form className="w-full h-full bg-[rgba(255,255,255,0.9)] p-8">
            <h2 className="text-4xl font-bold text-gray-700 text-center mt-24 mb-24">Iniciar sesión</h2>
  
            <div className="input-group relative mb-14 w-full max-w-[400px] mx-auto">
              <input
                type="text"
                id="username"
                required
                className="peer w-full min-w-[200px] h-full p-4 pt-8 border border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-300 text-black text-xl"
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute left-5 -top-0 text-lg font-medium text-gray-600 transition-all duration-300 ease-in-out peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-focus:-top-0 peer-focus:left-3 peer-focus:text-lg peer-focus:text-gray-700"
              >
                Nombre de Usuario
              </label>
            </div>
  
            <div className="input-group relative mb-6 w-full max-w-[400px] mx-auto">
              <input
                type="password"
                id="password"
                required
                className="peer w-full min-w-[200px] h-full p-4 pt-8 border border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-300 text-black text-xl"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute left-5 -top-0 text-lg font-medium text-gray-600 transition-all duration-300 ease-in-out peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-focus:-top-0 peer-focus:left-3 peer-focus:text-lg peer-focus:text-gray-700"
              >
                Contraseña
              </label>
            </div>
  
            <div className="mt-10 text-center">
              <a
                href="/recuperar-contraseña"
                className="text-blue-600 text-base hover:text-blue-700"
              >
                ¿Has olvidado tu contraseña?
              </a>
            </div>
  
            <button
              type="submit"
              className="w-1/4 min-w-[150px] bg-customPalette-orange text-white text-lg font-semibold py-3 px-8 rounded hover:bg-customPalette-orange mt-24 mb-6 mx-auto block"
            >
              Ingresar
            </button>

            <div className="mt-16 text-center">
              <a
                href="/recuperar-contraseña"
                className="text-blue-600 text-lg hover:text-blue-700"
              >
                ¿Todavia no tienes cuenta? Registrarse
              </a>
            </div>

          </form>
        </div>
      </div>
    );
  };
  
  export default LoginForm;
  