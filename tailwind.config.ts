import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customPalette: {
          blue: "var(--custom-blue)", // Azul principal
          orange: "var(--custom-orange)", // Naranja para hover y active
          white: "var(--custom-white)", // Blanco para texto
          whitelight: "var(--custom-whiteligth)", // Blanco para texto
          gray: "var(--custom-gray)", // Gris para contenido secundario
          black: "var(--custom-black)", // Negro no tan negro
          bluedark: "var(--custom-blue-800)", /* Azul oscuro */
          bluelight: "var(--custom-blue-700)", /* Azul más claro que el azul oscuro */
          bluelightst: "var(--custom-blue-600)", /* Azul más claro que Azul más claro que el azul oscuro */
          bluelink: "var(--custom-blue-500)", /* Azul medio para enlaces */
          bluelightli: "var(--custom-blue-300)", /* Azul más claro que Azul medio para enlaces */
          orangebright: "var(--custom-orange-500)", /* Naranja brillante */
          red: "var(--custom-red)" /* Rojo */,
          graydark: "var(--custom-gray-dark)" /* Gris oscuro */,
          green: "var(--custom-green)"
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
