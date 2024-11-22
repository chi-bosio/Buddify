import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
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
          <main>{children}</main>
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
