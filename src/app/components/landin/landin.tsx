import Link from "next/link";


export function Landin(){
    return(
        <section className="bg-[url('/assets/fondo2.webp')] bg-contain bg-center text-customPalette-white py-20 text-center min-h-screen flex justify-start items-center">
          <div className="z-10 relative container mx-auto px-4 w-full">
            <h2 className="text-4xl font-bold mb-5 text-customPalette-white">
              Te damos la bienvenida a Buddify
            </h2>
            <p className="text-lg mb-8 text-customPalette-white">
              Da el primer paso hacia una nueva aventura
            </p>
            <Link
              href="/register"
              className="bg-customPalette-orange text-customPalette-white font-semibold py-2 px-5 mt-8 rounded hover:bg-customPalette-orange"
            >
              Registrate
            </Link>
            <p className="mt-6 text-sm text-customPalette-white my-5">
              ¿Ya tenés tu cuenta?&nbsp;
              <Link
                href="/login"
                className="text-customPalette-orange hover:underline"
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