const LoginForm = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
        <div className="md:col-span-2 bg-cover bg-center h-full" style={{ backgroundImage: 'url(/assets/fondoLanding.png)' }}></div>
  
        <div className="flex justify-center items-center h-full">
          <form className="w-full h-full bg-customPalette-white p-8">
            <h2 className="text-4xl font-bold text-customPalette-graydark text-center mt-24 mb-24">Iniciar sesión</h2>
  
            <div className="input-group relative mb-14 w-full max-w-[400px] mx-auto">
              <input
                type="text"
                id="username"
                required
                className="peer w-full min-w-[200px] h-full p-4 pt-6 border border-customPalette-black rounded-md shadow-sm focus:ring-customPalette-bluelink focus:border-customPalette-bluelightli text-customPalette-black text-xl"
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-base font-medium text-customPalette-graydark mt-1"
              >
                Nombre de Usuario
              </label>
            </div>
  
            <div className="input-group relative mb-6 w-full max-w-[400px] mx-auto">
              <input
                type="password"
                id="password"
                required
                className="peer w-full min-w-[200px] h-full p-4 pt-6 border border-customPalette-black rounded-md shadow-sm focus:ring-customPalette-bluelink focus:border-customPalette-bluelightli text-customPalette-black text-xl"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-base font-medium text-customPalette-graydark mt-1"
              >
                Contraseña
              </label>
            </div>
  
            <div className="mt-10 text-center">
              <a
                href="/recuperar-contraseña"
                className="text-customPalette-bluelink text-base hover:text-customPalette-bluelight"
              >
                ¿Has olvidado tu contraseña?
              </a>
            </div>
  
            <button
              type="submit"
              className="w-1/4 min-w-[150px] bg-customPalette-orange text-customPalette-white text-lg font-semibold py-3 px-8 rounded hover:bg-customPalette-orange mt-24 mb-6 mx-auto block"
            >
              Ingresar
            </button>

            <div className="mt-16 text-center">
            <p className="text-base text-customPalette-black">
              ¿Todavia no tienes cuenta?&nbsp;
              <a
                href="/register"
                className="text-customPalette-bluelightst text-lg hover:text-customPalette-bluedark"
              >
                Registrarse
              </a>
            </p>  
            </div>
            
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginForm;
  