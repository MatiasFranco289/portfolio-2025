"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../css/Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className={styles.header}>
      <span>
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
      </span>

      <span>
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
      </span>

      <span>
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
      </span>
    </div>
  );
}
