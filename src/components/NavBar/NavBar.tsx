"use client";
import Link from "next/link";
import Logo from "./components/Logo";
import NavLink from "./components/NavLink";
import { useState } from "react";
import Image from "next/image";

export default function NavBar() {
  const [linkActive, setLinkActive] = useState("Home");

  function handlerOnClick(e: React.MouseEvent<HTMLAnchorElement>): void {
    setLinkActive(e.currentTarget.innerText);
  }

  const links = [
    {
      title: "Home",
      href: "/",
    },
  ];

  const logged = false;
  if (logged) {
    links.push({
      title: "Mis actividades",
      href: "/",
    });
  } else {
    links.push({
      title: "Nosotros",
      href: "/",
    });
    links.push({
      title: "Contacto",
      href: "/",
    });
  }

  return (
    <nav className="flex items-center justify-between bg-customPalette-blue px-8 py-4 flex-col sm:flex-row">

      <Link className="flex h-auto items-center justify-center w-full sm:w-auto mb-4 sm:mb-0" href="/">
        <div className="w-auto h-auto md:w-40">
          <Logo />
        </div>
      </Link>

      <div className="flex flex-col sm:flex-row sm:gap-6 w-full sm:w-auto items-center sm:items-center">
        {links.map((link) => (
          <NavLink
            key={link.title}
            href={link.href}
            title={link.title}
            onClick={handlerOnClick}
            active={linkActive === link.title}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        {logged && (
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
        )}
      </div>
    </nav>
  );
}
