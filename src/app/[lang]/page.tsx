"use client";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import TitleBorders from "@/components/TitleBorders";
import NetworkButtons from "@/components/NetworkButtons";
import { useEffect } from "react";
import { useGlobal } from "@/components/GlobalProvider";

export default function Home() {
  const { homeVisited, appReady } = useGlobal();

  useEffect(() => {
    if (homeVisited.current || !appReady) return;
    homeVisited.current = true;
  }, [appReady]);

  return (
    <div className="min-h-screen bg-[#1c1e1e] flex justify-center items-center font-roboto">
      <div className="space-y-4 relative p-8 sm:p-12 m-6 w-auto lg:w-4xl">
        <Title />
        <SubTitle />
        <TitleBorders />
        <NetworkButtons />
      </div>
    </div>
  );
}
