import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
