import Link from "next/link";
import { roboto } from "./fonts/Roboto";

export default function NavLink({
  title,
  href,
  onClick,
  active,
}: {
  active: boolean;
  title: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`hover:text-customPalette-orange text-custom-white relative inline-block font-medium ${roboto.className} group mb-4 sm:mb-0`}
    >
      {title}
      <span
        className={`absolute bottom-[-4px] left-1/2 w-0 h-[3px] bg-customPalette-orange rounded-full transition-all duration-300 ease-in-out ${
          active
            ? "left-0 w-full" 
            : "group-hover:w-full group-hover:left-0" 
        }`}
      ></span>
      {active && (
        <span
          className={`absolute bottom-[-4px] left-0 w-full h-[3px] bg-customPalette-orange rounded-full`}
        ></span>
      )}
    </Link>
  );
}
