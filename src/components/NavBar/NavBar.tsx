/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import Logo from "./components/Logo";
import NavLink from "./components/NavLink";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "../../contexts/authContext";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const username = "Usuario" //llega por contexto
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [linkActive, setLinkActive] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn = false, logout } = useAuthContext();
  const [isClient, setIsClient] = useState(false);

  const links = useMemo(() => {
    if (!isClient) return [];
    return [
      { title: "Inicio", href: "/" },
      ...(isLoggedIn
        ? [
            { title: "Crear actividad", href: "/create-activity" },
            { title: "Datos personales", href: "/profile" },
          ]
        : [
            { title: "Nosotros", href: "/about" },
            { title: "Registro", href: "/register" },
            { title: "Login", href: "/login" },
          ]),
    ];
  }, [isClient, isLoggedIn]);

  useEffect(() => {
    if (openMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openMenu]);

  useEffect(() => {
    const activeLink = links.find((link) => pathname === link.href);
    if (activeLink) {
      setLinkActive(activeLink.title);
      if (openMenu) {
        setOpenMenu(false);
      }
    }

    setIsClient(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, links]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handlerOnClickMenu = () => {
    setOpenAvatar(false); 
    setOpenMenu(!openMenu);
  };

  const handlerOnClickAvatar = () => {
    setOpenMenu(false); 
    setOpenAvatar(!openAvatar);
  };

  if (!isClient) {
    return <div>Cargando...</div>;
  }

  return (
    <nav className="relative bg-customPalette-black flex items-center justify-between px-3">
      
      <Link href="/" className="flex items-center justify-center h-14 w-30 lg:h-20">
        <Logo />
      </Link>
      <div className="flex lg:flex-row-reverse ">
        {isLoggedIn && (
          <div className="z-50 lg:z-20 relative flex items-center justify-center">
            <img
              onClick={handlerOnClickAvatar}
              className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center"
              src="https://res.cloudinary.com/dtlmrtzpa/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731928071/avatar16_dsdi8v.png"
              alt="Avatar"
            />
            <div
              className={`${
                openAvatar ? "flex" : "hidden"
              } bg-customPalette-black lg:flex rounded px-3 py-2 absolute top-10 lg:top-0 right-0 lg:relative items-start lg:items-center justify-center flex-col w-44 lg:w-auto lg:flex-row`}
            >
              <span className="lg:mr-3">{username}</span>
              <button
                onClick={handleLogout}
                className="w-auto min-w-20  bg-customPalette-orange text-customPalette-white text-xs lg:text-sm font-semibold py-1 px-8 lg:px-4 rounded hover:bg-customPalette-orangebright lg:m-0  mt-5 mb-5 mx-auto lg:block"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
        
        
        <div
          className={`z-40 absolute lg:relative flex-col justify-center items-center lg:flex-row top-0 left-0 right-0 bg-customPalette-black lg:bg-transparent px-4 py-6 transition-all duration-300 ease-in-out h-screen lg:h-auto ${
            openMenu ? "flex" : "hidden"
          } lg:flex `
        }
        >
          <ul className={`flex flex-col items-center justify-center lg:flex-row  gap-4 w-full mb-5 lg:mb-0  ${isLoggedIn?"lg:mr-32":"lg:mr-96"}`}>
            {links.map((link) => (
              <>
              {link.title !=="Registro" && link.title !== "Login" &&(
                <li key={link.href} className="flex items-center justify-center">
                  <NavLink
                    href={link.href}
                    title={link.title}
                    active={linkActive === link.title}
                  />
                </li>
              )}
              </>
            ))}
          </ul>
          <ul className="flex flex-col item-center justify-center lg:flex-row gap-4 lg:w-auto w-full" >
            {!isLoggedIn && (
            <>
              <li key="register" className="flex items-center justify-center">
                <NavLink
                  href="/register"
                  title="Registro"
                  active={linkActive === "Registro"}
                />
              </li>
              <li key="login" className="flex items-center justify-center">
                <NavLink
                  href="/login"
                  title="Login"
                  active={linkActive === "Login"}
                />
              </li>
            </>
            )}
          </ul>
        </div>
      </div>
      <button
        onClick={handlerOnClickMenu}
        className="lg:hidden text-white flex items-center justify-center"
        aria-label="Abrir menú"
      >
        {openMenu ? <X className="z-50 h-6 w-6" /> : <Menu className="z-50 h-6 w-6" />}
      </button>
    </nav>
  );
}
