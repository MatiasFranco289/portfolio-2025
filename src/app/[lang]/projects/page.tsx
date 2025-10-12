"use client";
import axiosInstance from "@/axios";
import { useGlobal } from "@/components/GlobalProvider";
import { API_KEY, PROJECTS_FROM_USER_URL } from "@/constants";
import { useEffect, useState } from "react";
import { Project } from "../../interfaces";
import ProjectCard from "@/components/ProjectCard";
import { useParams } from "next/navigation";
import ProjectLoadingCard from "@/components/ProjectLoadingCard";

export default function Projects() {
  const { appReady } = useGlobal();
  const [projects, setProjects] = useState<Array<Project> | undefined>();
  const loadingCards = [1, 2, 3];
  const params = useParams();
  const title = {
    es: "Proyectos Destacados",
    en: "Featured Projects",
  };

  useEffect(() => {
    if (!appReady) return;
    getProject();

    async function getProject() {
      const jwt = localStorage.getItem(API_KEY);

      axiosInstance
        .get(PROJECTS_FROM_USER_URL, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: {
            lang: params.lang === "es" ? "ES" : "US",
          },
        })
        .then((res) => {
          setProjects(res.data.data);
        })
        .catch((err) => {
          console.error(
            `The following error has occurred while trying to get the projects: `
          );
          console.error(err);
        });
    }
  }, [appReady]);

  return (
    <div className="bg-[#1c1e1e] min-h-screen w-full p-6">
      <h2 className="text-3xl font-roboto font-semibold mt-12">
        {title[params.lang as keyof typeof title]}
      </h2>

      {projects ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {projects.map((project, index) => {
            return (
              <ProjectCard
                id={project.id}
                name={project.name}
                shortDescription={project.short_description}
                logo={project.logo}
                status={project.status}
                tags={project.tags}
                animationDelay={index * 200}
                key={`project_card_${index}`}
              />
            );
          })}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {loadingCards.map((c, index) => {
            return (
              <ProjectLoadingCard
                key={`loading_card_${index}`}
                animationDelay={index * 1000}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
