"use client";
import Link from "next/link";
import Logo from "./components/Logo";
import NavLink from "./components/NavLink";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [linkActive, setLinkActive] = useState<string>("");
  const pathname = usePathname();

  const logged = false; 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const links = [
    {
      title: "Inicio",
      href: "/",
    },
    ...(logged
      ? [
          {
            title: "Mis actividades",
            href: "/activities",
          },
          {
            title: "Crear actividad",
            href: "/create-activity",
          },
        ]
      : [
          {
            title: "Nosotros",
            href: "/about",
          },
          {
            title: "Contacto",
            href: "/contact",
          },
          { 
            title: "Registro", 
            href: "/register" 
          },
          { 
            title: "Login", 
            href: "/login" 
          }
        ]),
    
  ];


  useEffect(() => {
    const activeLink = links.find((link) => pathname === link.href);
    if (activeLink) {
      setLinkActive(activeLink.title);
    }
  }, [pathname, links]);

  return (
    <nav className="flex items-center justify-between bg-customPalette-black px-8 py-4 flex-col sm:flex-row">
      <Link
        className="flex h-auto items-center justify-center w-full sm:w-auto mb-4 sm:mb-0"
        href="/"
      >
        <div className="w-auto h-auto md:w-40">
          <Logo />
        </div>
      </Link>

      <div className="flex flex-col sm:flex-row sm:gap-6 w-full sm:w-auto items-center sm:items-center">
        {links
          .filter(
            (link) =>
              link.title !== "Registro" && link.title !== "Login" // Excluir "Registro" y "Login" del listado principal
          )
          .map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              title={link.title}
              active={linkActive === link.title}
            />
          ))}
      </div>

      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        {logged ? (
          <>
            <span>Usuario</span>
            <Image
              className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center"
              src="/"
              alt="Avatar"
              width={10}
              height={10}
            />
          </>
        ) : (
          <>
            <NavLink
              key="registro-link"
              href="/register"
              title="Registro"
              active={linkActive === "Registro"}
            />
            <NavLink
              key="login-link"
              href="/login"
              title="Login"
              active={linkActive === "Login"}
            />
          </>
        )}
      </div>
    </nav>
  );
}
