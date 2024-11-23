"use client";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100, currency: "usd" }),
        }
      );

      const { clientSecret } = await res.json();
      if (!stripe || !elements) {
        throw new Error("Stripe.js o Elements no se cargaron correctamente");
      }

      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement!,
          },
        }
      );

      if (error) {
        console.error("Error al confirmar el pago:", error);
        alert("Error durante el pago.");
      } else if (paymentIntent?.status === "succeeded") {
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
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Realizar un Pago</h2>
      <form onSubmit={handleCheckout}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="amount">Monto (USD):</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "10px",
            }}
            placeholder="Ingresa el monto"
            required
          />
        </div>

        {/* CardElement para capturar la tarjeta */}
        <div style={{ marginBottom: "20px" }}>
          <label>Detalles de la tarjeta:</label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  letterSpacing: "0.025em",
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || amount <= 0}
          style={{
            backgroundColor: loading ? "#ccc" : "#0070f3",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Procesando..." : "Pagar"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
