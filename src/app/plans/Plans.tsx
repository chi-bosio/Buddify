"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function Plans({
  setShowPlans,
}: {
  setShowPlans: (bol: boolean) => void;
}) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const plans = [
    {
      id: "free",
      name: "Plan Gratuito",
      price: 0,
      features: ["Hasta 3 actividades por mes"],
    },
    {
      id: "full-access",
      name: "Acceso Completo",
      price: 10.0,
      features: [
        "Creación ilimitada de actividades",
        "Acceso ilimitado a otras actividades",
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + plans.length) % plans.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % plans.length);
  };

  const handlePlanSelection = (plan: {
    id: string;
    name: string;
    price: number;
  }) => {
    if (plan.id === "free") {
      Swal.fire({
        title: "¡Plan gratuito seleccionado!",
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
      }).then(() => {
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

        {isMobile ? (
          <div
            id="controls-carousel"
            className="relative w-full"
            data-carousel="static"
          >
            <div className="relative overflow-hidden rounded-lg">
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`group relative flex flex-col mx-auto w-full max-w-sm bg-customPalette-white rounded-2xl shadow-2xl transition-all duration-300 p-8 xl:p-12 ${
                    index === activeIndex ? "block" : "hidden"
                  }`}
                  data-carousel-item="active"
                >
                  <div className="border-b border-solid border-customPalette-graydark pb-9 mb-9">
                    <div className="w-16 h-16 rounded-full bg-customPalette-bluelightli mx-auto flex justify-center items-center transition-all duration-300 group-hover:bg-customPalette-bluedark">
                      {plan.id === "free" ? (
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
                      ) : (
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
                      )}
                    </div>
                    <h3 className="font-manrope text-2xl font-bold my-7 text-center text-customPalette-bluedark">
                      {plan.name}
                    </h3>
                    <div className="flex items-center justify-center">
                      <span className="font-manrope text-4xl font-medium text-customPalette-black">
                        {plan.price === 0 ? "$0" : `$${plan.price}`}
                      </span>
                      <span className="text-xl text-customPalette-graydark ml-3">
                        |&nbsp; Mes
                      </span>
                    </div>
                  </div>
                  <ul className="mb-12 space-y-6 text-left text-lg text-customPalette-bluedark">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-customPalette-blue"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePlanSelection(plan)}
                    className="py-2.5 px-5 bg-customPalette-bluelightli shadow-sm rounded-full transition-all duration-500 text-base text-customPalette-blue font-semibold text-center w-fit mx-auto group-hover:bg-customPalette-bluedark group-hover:text-customPalette-white"
                  >
                    {plan.price === 0 ? "Continuar gratis" : "Seleccionar plan"}
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40 flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                <svg
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 1L1 5l4 4"
                  />
                </svg>
              </span>
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40 flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                <svg
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M1 1l4 4-4 4"
                  />
                </svg>
              </span>
            </button>
          </div>
        ) : (
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
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className="group relative flex flex-col mx-auto w-full max-w-sm bg-customPalette-white rounded-2xl shadow-2xl transition-all duration-300 p-8 xl:p-12 h-full"
                    >
                      <div className="border-b border-solid border-customPalette-graydark pb-9 mb-9">
                        <div className="w-16 h-16 rounded-full bg-customPalette-bluelightli mx-auto flex justify-center items-center transition-all duration-300 group-hover:bg-customPalette-bluedark">
                          {plan.id === "free" ? (
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
                          ) : (
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
                          )}
                        </div>
                        <h3 className="font-manrope text-2xl font-bold my-7 text-center text-customPalette-bluedark">
                          {plan.name}
                        </h3>
                        <div className="flex items-center justify-center">
                          <span className="font-manrope text-4xl font-medium text-customPalette-black">
                            ${plan.price}
                          </span>
                          <span className="text-xl text-customPalette-graydark ml-3">
                            |&nbsp; Mes
                          </span>
                        </div>
                      </div>
                      <ul className="mb-12 space-y-6 text-left text-lg text-customPalette-bluedark">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-3.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-customPalette-blue"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Field
                        type="radio"
                        name="selectedPlan"
                        value={JSON.stringify(plan)}
                        className="hidden"
                      />
                      <button
                        type="submit"
                        onClick={() =>
                          setFieldValue("selectedPlan", JSON.stringify(plan))
                        }
                        className="py-2.5 px-5 bg-customPalette-bluelightli shadow-sm rounded-full transition-all duration-500 text-base text-customPalette-blue font-semibold text-center w-fit mx-auto group-hover:bg-customPalette-bluedark group-hover:text-customPalette-white"
                      >
                        {plan.name === "Plan Gratuito"
                          ? "Continuar gratis"
                          : "Seleccionar Plan"}
                      </button>
                    </div>
                  ))}
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </section>
  );
}
