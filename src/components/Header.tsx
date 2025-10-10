"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import styles from "../css/Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const params = useParams();
  const navTexts = {
    es: {
      home: "Inicio",
      projects: "Proyectos",
      about: "Sobre mí",
    },
    en: {
      home: "Home",
      projects: "Projects",
      about: "About",
    },
  };

  return (
    <div className={styles.header}>
      <span>
        <Link
          href={"/"}
          className={`${
            pathname === `/${params.lang}`
              ? "text-white cursor-default scale-105"
              : "text-white/70 cursor-pointer"
          } hover:text-white hover:scale-105 duration-200 `}
        >
          {navTexts[(params.lang || "en") as keyof typeof navTexts].home}
        </Link>
      </span>

      <span>
        <Link
          href={`/${params.lang}/projects`}
          className={`${
            pathname === `/${params.lang}/projects`
              ? "text-white cursor-default scale-105"
              : "text-white/70 cursor-pointer"
          } hover:text-white hover:scale-105 duration-200`}
        >
          {navTexts[(params.lang || "en") as keyof typeof navTexts].projects}
        </Link>
      </span>

      <span>
        <Link
          href={`/${params.lang}/about`}
          className={`${
            pathname === `/${params.lang}/about`
              ? "text-white cursor-default scale-105"
              : "text-white/70 cursor-pointer"
          } hover:text-white hover:scale-105 duration-200`}
        >
          {navTexts[(params.lang || "en") as keyof typeof navTexts].about}
        </Link>
      </span>
    </div>
  );
}
