import { useState } from "react";
import { stripePromise } from "../../../utils/stripe-client";

const CheckoutButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Llama a tu API del backend para crear el Payment Intent
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 1000, currency: "usd" }), // Monto en centavos
      });

      const { clientSecret } = await res.json();

      // Obtén una instancia de Stripe
      const stripe = await stripePromise;

      if (!stripe) throw new Error("Stripe.js no se cargó correctamente");

      // Redirige al formulario de pago
      const { error } = await stripe.confirmCardPayment(clientSecret);

      if (error) {
        console.error("Error al confirmar el pago:", error);
        alert("Error durante el pago.");
      } else {
        alert("Pago realizado con éxito.");
      }
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      alert("Ocurrió un error durante el proceso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Procesando..." : "Pagar"}
    </button>
  );
};

export default CheckoutButton;
