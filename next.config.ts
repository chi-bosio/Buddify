import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignora errores de ESLint en la construcción
  },
  /* puedes agregar otras configuraciones aquí */
};

export default nextConfig;
