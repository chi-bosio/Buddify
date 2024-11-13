import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-[url('/assets/fondoLanding.png')] bg-cover bg-center text-customPalette-white py-20 text-center">
        <div className="bg-black bg-opacity-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">Bienvenido a Buddify</h2>
            <p className="text-lg mb-6">
              Da el primer paso hacia una nueva aventura
            </p>
            <button className="bg-customPalette-orange text-white font-semibold py-2 px-4 rounded hover:bg-customPalette-orange">
              Registrate
            </button>
            <p className="mt-4 text-sm text-customPalette-gray">
              ¿Ya tienes tu cuenta?
              <Link
                href="/login"
                className="text-customPalette-orange hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
