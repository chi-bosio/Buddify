"use client";
import Link from "next/link";
import Logo from "./components/Logo";
import NavLink from "./components/NavLink";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "../../contexts/authContext";

export default function NavBar() {
  const [linkActive, setLinkActive] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn = false , logout} = useAuthContext();
  const [isClient, setIsClient] = useState(false);
  const links = useMemo(() => {
    if (!isClient) return []; 
    return [
      { title: "Inicio", href: "/" },
      ...(isLoggedIn
        ? [{ title: "Mis actividades", href: "/activities" }]
        : [{ title: "Nosotros", href: "/about" }]),
    ];
  }, [isClient, isLoggedIn]);
  useEffect(() => {
    const activeLink = links.find((link) => pathname === link.href);
    if (activeLink) {
      setLinkActive(activeLink.title);
    }
    setIsClient(true);
  }, [pathname, links]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  if (!isClient) {
    return <div>Cargando...</div>;
  }
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
              link.title !== "Registro" && link.title !== "Login"
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
        {isLoggedIn ? (
          <>
            <span>Usuario</span>
            <Image
              className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center"
              src="/"
              alt="Avatar"
              width={10}
              height={10}
            />
            <button
              onClick={handleLogout}
              className="text-white hover:text-customPalette-orange"
            >
              Cerrar sesión
            </button>
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

