import Footer from "./components/Footer/Footer";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header></header>
        <main>
          {children} 
        </main>
          <Footer/>  
      </body>
    </html>
  );
}



