"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";

export default function Plans({setShowPlans}:{setShowPlans:(bol:boolean)=>void}) {
  const router = useRouter();

  const handlePlanSelection = (plan: {
    id: string;
    name: string;
    price: number;
  }) => {
    if (plan.id === "free") {
      Swal.fire({
        title: "¡Plan Gratuito Seleccionado!",
        text: "Has elegido el plan gratuito. Serás redirigido al inicio.",
        icon: "info",
        confirmButtonText: "Aceptar",
      }).then(() => {
        const timeoutId = setTimeout(() => {
          Swal.close();
          setShowPlans(false);
        }, 500);

        setTimeout(() => {
          clearInterval(timeoutId);
        }, 700);
        setTimeout(() => {
          router.push("/");
        }, 900);
      });
    } else {
      const query = new URLSearchParams({
        id: plan.id,
        name: plan.name,
        price: plan.price.toString(),
      }).toString();
      Swal.fire({
        title: "Cargando...",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then(()=>{
        setShowPlans(false);
        router.push(`/plans/stripe?${query}`);
      });
      const timeoutId = setTimeout(() => {
        Swal.close();
      }, 500);

      setTimeout(() => {
        clearInterval(timeoutId);
      }, 700);
      
    }
  };

  return (
    <section className="py-5 relative flex justify-center items-center">
      <div className="absolute h-full w-full top-0 bg-gradient-to-r from-customPalette-bluedark to-customPalette-bluelight -z-10 "></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-manrope text-5xl text-center font-bold text-customPalette-white mb-8">
            Planes de precios adecuados
          </h2>
        </div>

        <Formik
          initialValues={{ selectedPlan: "" }}
          onSubmit={(values) => {
            const selectedPlan = JSON.parse(values.selectedPlan);
            handlePlanSelection(selectedPlan);
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-start">
                {/* Plan Gratuito */}
                <div className="group relative flex flex-col mx-auto w-full max-w-sm bg-customPalette-white rounded-2xl shadow-2xl transition-all duration-300 p-8 xl:p-12 h-full">
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
                      <span className="w-1.5 h-1.5 rounded-full bg-customPalette-blue"></span>
                      <span>Hasta 3 actividades por mes</span>
                    </li>
                  </ul>
                  <Field
                    type="radio"
                    name="selectedPlan"
                    value={JSON.stringify({
                      id: "free",
                      name: "Plan Gratuito",
                      price: 0,
                    })}
                    className="hidden"
                  />
                  <button
                    type="submit"
                    onClick={() =>
                      setFieldValue(
                        "selectedPlan",
                        JSON.stringify({
                          id: "free",
                          name: "Plan Gratuito",
                          price: 0,
                        })
                      )
                    }
                    className="py-2.5 px-5 bg-customPalette-bluelightli shadow-sm rounded-full transition-all duration-500 text-base text-customPalette-blue font-semibold text-center w-fit mx-auto group-hover:bg-customPalette-bluedark group-hover:text-customPalette-white"
                  >
                    Continuar gratis
                  </button>
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
                        $10.00
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
                      <span>Acceso ilimitado a otras actividades</span>
                    </li>
                  </ul>
                  <Field
                    type="radio"
                    name="selectedPlan"
                    value={JSON.stringify({
                      id: "full-access",
                      name: "Acceso Completo",
                      price: 49.99,
                    })}
                    className="hidden"
                  />
                  <button
                    type="submit"
                    onClick={() =>
                      setFieldValue(
                        "selectedPlan",
                        JSON.stringify({
                          id: "full-access",
                          name: "Acceso Completo",
                          price: 49.99,
                        })
                      )
                    }
                    className="py-2.5 px-5 bg-customPalette-bluelightli shadow-sm rounded-full transition-all duration-500 text-base text-customPalette-blue font-semibold text-center w-fit mx-auto group-hover:bg-customPalette-bluedark group-hover:text-customPalette-white"
                  >
                    Seleccionar Plan
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
