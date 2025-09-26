"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className="font-roboto w-full flex justify-end space-x-4 absolute top-0 left-0 p-5">
      <Link
        href={"/"}
        className={`${
          pathname === "/"
            ? "text-white cursor-default scale-105"
            : "text-white/70 cursor-pointer"
        } hover:text-white hover:scale-105 duration-200 `}
      >
        Inicio
      </Link>

      <Link
        href={"/projects"}
        className={`${
          pathname === "/projects"
            ? "text-white cursor-default scale-105"
            : "text-white/70 cursor-pointer"
        } hover:text-white hover:scale-105 duration-200`}
      >
        Proyectos
      </Link>

      <Link
        href={"/about"}
        className={`${
          pathname === "/about"
            ? "text-white cursor-default scale-105"
            : "text-white/70 cursor-pointer"
        } hover:text-white hover:scale-105 duration-200`}
      >
        Sobre mí
      </Link>
    </div>
  );
}
