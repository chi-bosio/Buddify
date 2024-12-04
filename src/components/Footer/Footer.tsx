import React from "react";

const Footer = () => {
  return (
    <footer className="bg-customPalette-blue text-white py-6">
      <div className="container mx-auto text-center px-4">
        <p>
          &copy; {new Date().getFullYear()} Buddify. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
