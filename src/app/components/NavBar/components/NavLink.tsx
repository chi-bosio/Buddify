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
        className={`absolute bottom-[-4px] left-1/2 translate-x-[-50%] w-0 h-[3px] bg-customPalette-orange rounded-full transition-all duration-300 ease-in-out ${
          active
            ? "w-full left-0 translate-x-0" 
            : "group-hover:w-[60%] group-hover:left-1/2 group-hover:translate-x-[-50%]" 
        }`}
      ></span>
      {active && (
        <span
          className={`absolute bottom-[-4px] left-0 w-0 h-[3px] bg-customPalette-orange rounded-full transition-all duration-300 ease-in-out`} 
        ></span>
      )}
    </Link>
  );
}
