export default function Plans() {
  return (
    <section className="py-5 relative flex justify-center items-center">
      <div className="absolute h-full w-full top-0 bg-gradient-to-r from-customPalette-bluedark to-customPalette-bluelight -z-10 rounded-2xl"></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-manrope text-5xl text-center font-bold text-customPalette-white mb-8">
            Planes de precios adecuados
          </h2>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-center">
          {/* Plan Gratuito */}
          <div className="group relative flex flex-col mx-auto w-full max-w-sm bg-customPalette-white rounded-2xl shadow-2xl transition-all duration-300 p-8 xl:p-12">
            <div className="border-b border-solid border-customPalette-graydark pb-9 mb-9">
              <div className="w-16 h-16 rounded-full bg-customPalette-bluelightli mx-auto flex justify-center items-center transition-all duration-300 group-hover:bg-customPalette-bluedark">
                <svg
                  className="w-6 h-6 text-customPalette-blue transition-all duration-300 group-hover:text-customPalette-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="7"
                    width="20"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M6 12H6.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 12H18.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="font-manrope text-2xl font-bold my-7 text-center text-customPalette-bluedark">
                Plan Gratuito
              </h3>
              <div className="flex items-center justify-center">
                <span className="font-manrope text-4xl font-medium text-customPalette-black">
                  $0
                </span>
                <span className="text-xl text-customPalette-graydark ml-3">
                  |&nbsp; Mes
                </span>
              </div>
            </div>
            <ul className="mb-12 space-y-6 text-left text-lg text-customPalette-bluedark">
              <li className="flex items-center space-x-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-customPalette-blue "></span>
                <span>Hasta 3 actividades por mes</span>
              </li>
              <li className="flex items-center space-x-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-customPalette-blue"></span>
                <span>2 actividades por semana</span>
              </li>
            </ul>
            <a
              href="javascript:;"
              className="py-2.5 px-5 bg-customPalette-bluelightli shadow-sm rounded-full transition-all duration-500 text-base text-customPalette-blue font-semibold text-center w-fit mx-auto group-hover:bg-customPalette-bluedark group-hover:text-customPalette-white"
            >
              Continuar gratis
            </a>
          </div>
          {/* Acceso Completo */}
          <div className="group relative flex flex-col mx-auto w-full max-w-sm bg-customPalette-white rounded-2xl shadow-2xl transition-all duration-300 p-8 xl:p-12">
            <div className="border-b border-solid border-customPalette-graydark pb-9 mb-9">
              <div className="w-16 h-16 rounded-full bg-customPalette-bluelightli mx-auto flex justify-center items-center transition-all duration-300 group-hover:bg-customPalette-bluedark">
                <svg
                  className="w-6 h-6 text-customPalette-blue transition-all duration-300 group-hover:text-customPalette-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="4"
                    width="20"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 10H22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 16H6.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 16H14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-manrope text-2xl font-bold my-7 text-center text-customPalette-bluedark">
                Acceso Completo
              </h3>
              <div className="flex items-center justify-center">
                <span className="font-manrope text-4xl font-medium text-customPalette-black">
                  $49.99
                </span>
                <span className="text-xl text-customPalette-graydark ml-3">
                  |&nbsp; Mes
                </span>
              </div>
            </div>
            <ul className="mb-12 space-y-6 text-left text-lg text-customPalette-bluedark">
              <li className="flex items-center space-x-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-customPalette-blue"></span>
                <span>Creación ilimitada de actividades</span>
              </li>
              <li className="flex items-center space-x-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-customPalette-blue"></span>
                <span>Acceso ilimitada a otras actividades</span>
              </li>
              <li className="flex items-center space-x-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-customPalette-blue"></span>
                <span>2 semanas de prueba gratis</span>
              </li>
            </ul>
            <a
              href="javascript:;"
              className="py-2.5 px-5 bg-customPalette-bluelightli shadow-sm rounded-full transition-all duration-500 text-base text-customPalette-blue font-semibold text-center w-fit mx-auto group-hover:bg-customPalette-bluedark group-hover:text-customPalette-white"
            >
              Seleccionar Plan
            </a>
          </div>
          {/* Plan Proactivo */}
          <div className="group relative flex flex-col mx-auto w-full max-w-sm bg-customPalette-white rounded-2xl shadow-2xl transition-all duration-300 p-8 xl:p-12">
            <div className="border-b border-solid border-customPalette-graydark pb-9 mb-9">
              <div className="w-16 h-16 rounded-full bg-customPalette-bluelightli mx-auto flex justify-center items-center transition-all duration-300 group-hover:bg-customPalette-bluedark">
                <svg
                  className="w-6 h-6 text-customPalette-blue transition-all duration-300 group-hover:text-customPalette-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 14L9 20L12 18L15 20L12 14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-manrope text-2xl font-bold my-7 text-center text-customPalette-bluedark">
                Plan Proactivo
              </h3>
              <div className="flex items-center justify-center">
                <span className="font-manrope text-4xl font-medium text-customPalette-black">
                  $29.99
                </span>
                <span className="text-xl text-customPalette-graydark ml-3">
                  |&nbsp; Mes
                </span>
              </div>
            </div>
            <ul className="mb-12 space-y-6 text-left text-lg text-customPalette-bluedark">
              <li className="flex items-center space-x-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-customPalette-blue"></span>
                <span>15 actividades por mes</span>
              </li>
              <li className="flex items-center space-x-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-customPalette-blue"></span>
                <span>Acceso ilimitado a otras actividades</span>
              </li>
              <li className="flex items-center space-x-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-customPalette-blue"></span>
                <span>2 semanas de prueba gratis</span>
              </li>
            </ul>
            <a
              href="javascript:;"
              className="py-2.5 px-5 bg-customPalette-bluelightli shadow-sm rounded-full transition-all duration-500 text-base text-customPalette-blue font-semibold text-center w-fit mx-auto group-hover:bg-customPalette-bluedark group-hover:text-customPalette-white"
            >
              Seleccionar Plan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
