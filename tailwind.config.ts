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
          gray: "var(--custom-gray)", // Gris para contenido secundario
          black: "var(--custom-black)", // Negro no tan negro
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
