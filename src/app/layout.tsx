"use client";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import { Elements } from "@stripe/react-stripe-js"; // Importa Elements
import { stripePromise } from "../utils/stripe-client"; // Importa la configuración de stripe
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "../contexts/authContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <header>
            <NavBar />
          </header>
          {/* Envolvemos los hijos con Elements */}
          <Elements stripe={stripePromise}>
            <main>{children}</main>
          </Elements>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthContextProvider>
      </body>
    </html>
  );
}
