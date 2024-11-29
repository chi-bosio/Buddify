/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import Logo from "./components/Logo";
import NavLink from "./components/NavLink";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "../../contexts/authContext";
import { Menu, X } from "lucide-react";
import Swal from "sweetalert2";
import { Crown } from "../Crown/crown";

export default function NavBar() {
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [linkActive, setLinkActive] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn = false, logout, userName, avatar } = useAuthContext();
  const [isClient, setIsClient] = useState(false);
  const [urlAvatar, setUrlAvatar] = useState(
    "https://res.cloudinary.com/dtlmrtzpa/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731928071/avatar16_dsdi8v.png"
  );

  const links = useMemo(() => {
    if (!isClient) return [];
    return [
      { title: "Inicio", href: "/" },
      ...(isLoggedIn
        ? [
            { title: "Crear actividad", href: "/create-activity" },
            { title: "Datos personales", href: "/profile" },
            { title: "Mis actividades", href: "/my-activities" },
            { title: "Tu calendario", href: "/calendar" },
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
  const setAvatar = useCallback(() => {
    if (avatar) setUrlAvatar(avatar);
  }, [avatar]);
  useEffect(() => {
    const activeLink = links.find((link) => pathname === link.href);
    if (activeLink) {
      setLinkActive(activeLink.title);
      if (openMenu) {
        setOpenMenu(false);
      }
    }
    setAvatar();
    setIsClient(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, links, avatar, setAvatar]);

  const handleLogout = () => {
    Swal.fire({
      title: "Cargando...",
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const timeoutId = setTimeout(() => {
      Swal.close();
    }, 500);

    setTimeout(() => {
      clearInterval(timeoutId);
    }, 700);
    logout();
    router.push("/login");
    setOpenAvatar(false);
  };

  const handlerOnClickMenu = () => {
    setOpenAvatar(false);
    setOpenMenu(!openMenu);
  };

  const handlerOnClickAvatar = () => {
    setOpenMenu(false);
    setOpenAvatar(!openAvatar);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (openAvatar && !event.target.closest(".avatar-modal")) {
        setOpenAvatar(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openAvatar]);
  const handlerRedirectProfile = () => {
    Swal.fire({
      title: "Cargando...",
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const timeoutId = setTimeout(() => {
      Swal.close();
    }, 500);

    setTimeout(() => {
      clearInterval(timeoutId);
    }, 700);
    setOpenAvatar(false);
    router.push("/profile");
  };

  if (!isClient) {
    return <div>Cargando...</div>;
  }

  return (
    <nav className="relative bg-customPalette-black flex items-center justify-between px-3">
      <Link
        href="/"
        className="flex items-center justify-center h-14 w-30 lg:h-20"
      >
        <Logo />
      </Link>
      <div className="flex lg:flex-row-reverse ">
        {isLoggedIn && (
          <div className="z-50 lg:z-20 relative flex items-center justify-center">
            <Crown />
            <img
              onClick={handlerOnClickAvatar}
              className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer"
              src={urlAvatar}
              alt="Avatar"
            />
            <div
              className={`${
                openAvatar ? "flex" : "hidden"
              } avatar-modal bg-customPalette-black rounded px-3 py-2 absolute top-10 -left-14  lg:-left-40 md:top-16 sm:left-0 items-start shadow border border-customPalette-white justify-center flex-col w-48`}
            >
              <Link
                href="profile"
                className="lg:mr-3 text-customPalette-white hover:text-customPalette-whitelight"
              >
                {userName}
              </Link>
              <button
                onClick={handlerRedirectProfile}
                className="w-full min-w-20  bg-customPalette-blue text-customPalette-white text-xs lg:text-sm font-semibold py-1 px-1 lg:px-4 rounded hover:bg-customPalette-bluelight mt-10 mb-5"
              >
                Cambiar contraseña
              </button>
              <button
                onClick={handleLogout}
                className="min-w-20  bg-customPalette-orange text-customPalette-white text-xs lg:text-sm font-semibold py-1 px-8 lg:px-4 rounded hover:bg-customPalette-orangebright mt-5 mb-5 w-full"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        <div
          className={`z-40 absolute lg:relative flex-col justify-center items-center lg:flex-row top-0 left-0 right-0 bg-customPalette-black lg:bg-transparent px-4 py-6 transition-all duration-300 ease-in-out h-screen lg:h-auto ${
            openMenu ? "flex" : "hidden"
          } lg:flex `}
        >
          <ul
            className={`flex flex-col items-center justify-center lg:flex-row  gap-4 w-full mb-5 lg:mb-0  ${
              isLoggedIn ? "lg:mr-32" : "lg:mr-96"
            }`}
          >
            {links.map((link) => (
              <li key={link.href} className="flex items-center justify-center">
                {link.title !== "Registro" && link.title !== "Login" && (
                  <NavLink
                    href={link.href}
                    title={link.title}
                    active={linkActive === link.title}
                  />
                )}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col item-center justify-center lg:flex-row gap-4 lg:w-auto w-full">
            {!isLoggedIn && (
              <>
                <li key="registro" className="flex items-center justify-center">
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
        {openMenu ? (
          <X className="z-50 h-6 w-6" />
        ) : (
          <Menu className="z-50 h-6 w-6" />
        )}
      </button>
    </nav>
  );
}
