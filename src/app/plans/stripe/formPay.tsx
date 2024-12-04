"use client";
import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Formik, Form, Field } from "formik";
import { useAuthContext } from "../../../contexts/authContext";

const PaymentForm = () => {
  const { setterIsPremiumTrue } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planDetails, setPlanDetails] = useState<{
    id: string | null;
    name: string | null;
    price: number | null;
  }>({
    id: null,
    name: null,
    price: null,
  });
  const [userInfo, setUserInfo] = useState<{ id: string; name: string } | null>(
    null
  );

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const planId = searchParams.get("id");
    const planName = searchParams.get("name");
    const planPrice = parseFloat(searchParams.get("price") || "0");

    if (planId && planName && planPrice) {
      setPlanDetails({
        id: planId,
        name: planName,
        price: planPrice,
      });
    } else {
      router.push("/");
    }

    const tokenData = localStorage.getItem("NEXT_JS_AUTH");
    const token = tokenData ? JSON.parse(tokenData).token : null;

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.sub && decodedToken.name) {
          setUserInfo({
            id: decodedToken.sub,
            name: decodedToken.name,
          });
        }
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleCheckout = async (values: any) => {
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("No se pudo cargar Stripe correctamente.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Por favor, ingresa los detalles de la tarjeta.");
      setLoading(false);
      return;
    }

    const confirm = await Swal.fire({
      title: "Confirmar pago",
      text: `Estás a punto de pagar $${planDetails.price} por el plan ${planDetails.name}. ¿Deseas continuar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, pagar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#F9A03F",
      cancelButtonColor: "#235789",
    });

    if (!confirm.isConfirmed) {
      setLoading(false);
      return;
    } else {
      Swal.fire({
        title: "Cargando...",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const date = new Date().toISOString();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stripe/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              planId: planDetails.id,
              planName: planDetails.name,
              planPrice: planDetails.price,
              userId: userInfo?.id,
              userName: userInfo?.name,
              cardholderName: values.name,
              paymentDate: date,
              currency: "usd",
            }),
          }
        );

        const session = await response.json();

        if (!session.clientSecret) {
          const timeoutId = setTimeout(() => {
            Swal.close();
          }, 500);

          setTimeout(() => {
            clearInterval(timeoutId);
          }, 700);
          throw new Error("No se pudo obtener la información del pago.");
        }

        const { error: stripeError, paymentIntent } =
          await stripe.confirmCardPayment(session.clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: values.name,
              },
            },
          });

        if (stripeError) {
          setError(stripeError.message || "Ocurrió un error desconocido.");
          setLoading(false);
          const timeoutId = setTimeout(() => {
            Swal.close();
          }, 500);

          setTimeout(() => {
            clearInterval(timeoutId);
          }, 700);
          return;
        }
        const timeoutId = setTimeout(() => {
          Swal.close();
        }, 500);

        setTimeout(() => {
          clearInterval(timeoutId);
        }, 700);
        setTimeout(async () => {
          if (paymentIntent?.status === "succeeded") {
            Swal.fire(
              "Pago exitoso",
              "Tu pago fue procesado correctamente.",
              "success"
            );

            try {
              const updateResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/${userInfo?.id}/premium-status`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    isPremium: true,
                  }),
                }
              );

              const updateData = await updateResponse.json();

              if (updateResponse.ok && updateData.success) {
                Swal.fire({
                  title: "¡Éxito!",
                  text: "Ahora eres un usuario premium.",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                }).then(() => {
                  setterIsPremiumTrue();
                  router.push("/");
                });
              } else {
                setError(
                  updateData.message ||
                    "Hubo un error al actualizar tu estado de premium."
                );
              }
            } catch (error) {
              setError("Hubo un error al actualizar tu estado de premium.");
            }
          } else {
            setError("El pago no pudo ser procesado.");
            setLoading(false);
          }
        }, 900);
      } catch (err) {
        setError("Error al procesar el pago. Inténtalo de nuevo.");
        setLoading(false);
      }
    }
  };

  return (
    <section className="pt-10 relative flex justify-center items-center min-h-[85vh]">
      <div className="absolute h-full w-full top-0 bg-gradient-to-r from-customPalette-bluedark to-customPalette-bluelight -z-10 rounded-2xl"></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-manrope text-5xl text-center font-bold text-customPalette-white mb-4">
            Confirmar tu pago para {planDetails.name}
          </h2>
          <p className="text-lg text-customPalette-white">
            Estás a punto de realizar un pago de{" "}
            <strong>${planDetails.price}</strong> por el plan{" "}
            <strong>{planDetails.name}</strong>.
          </p>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 mb-6 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <Formik
          initialValues={{
            name: userInfo?.name || "",
          }}
          onSubmit={handleCheckout}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-customPalette-white mb-2">
                    Nombre del titular de la tarjeta:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-customPalette-white mb-2">
                    Número de tarjeta:
                  </label>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          color: "#FDFFFC",
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "14px",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                      },
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className={`py-3 px-6 bg-customPalette-orange rounded-full text-lg text-customPalette-white hover:bg-customPalette-orangebright font-semibold w-fit mx-auto ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "transition-all duration-300"
                  }`}
                >
                  {loading ? "Procesando..." : "Pagar ahora"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default PaymentForm;
