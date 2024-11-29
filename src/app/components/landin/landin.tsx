import Link from "next/link";


export function Landin(){
    return(
        <section className="text-customPalette-white py-20 text-center min-h-screen flex justify-start items-center">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
        style={{filter: "brightness(0.5)"}}
        poster="/assets/poster.png"
      >
        <source src="https://res.cloudinary.com/dwh8oup8f/video/upload/v1732804599/BUDDIFY2_g2z9wp.mp4" type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
          <div className="z-10 relative container mx-auto px-4 w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-customPalette-white">
                  Te damos la bienvenida a Buddify
            </h2>
              <p className="text-base sm:text-lg md:text-xl mb-8 text-customPalette-white">
                Da el primer paso hacia una nueva aventura
              </p>
                <Link
                  href="/register"
                  className="bg-customPalette-orange text-customPalette-white font-semibold py-2 px-5 mt-8 rounded hover:bg-customPalette-orange text-sm sm:text-base md:text-lg lg:text-xl"
                >
                  Registrate
                </Link>
              <p className="mt-6 text-xs sm:text-sm md:text-base text-customPalette-white my-5">
                ¿Ya tenés tu cuenta?&nbsp;
                  <Link
                    href="/login"
                    className="text-customPalette-orange hover:underline text-sm sm:text-base md:text-lg"
                  >
                    Login
                  </Link>
              </p>
            <div className="-z-10 absolute -top-10 left-0 bg-customPalette-black opacity-70 py-50 h-80 w-full">
            </div>
          </div>
      </section>
    );
}

export default Landin