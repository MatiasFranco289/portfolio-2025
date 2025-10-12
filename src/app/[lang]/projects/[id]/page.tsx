"use client";
import { ProjectDetails as ProjectDetailsI } from "@/app/interfaces";
import axiosInstance from "@/axios";
import { useGlobal } from "@/components/GlobalProvider";
import MarkdownSection from "@/components/MarkdownSection";
import { API_KEY, PROJECTS_URL } from "@/constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ExternalResourceList from "@/components/ExternalResourceList";
import ProjectBlogs from "@/components/ProjectBlogs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProjectDetailsLoading from "@/components/ProjectDetailsLoading";

export default function ProjectDetails() {
  const { appReady } = useGlobal();
  const params = useParams();
  const projectID = params.id;
  const [project, setProject] = useState<ProjectDetailsI>();

  useEffect(() => {
    if (!appReady) return;

    async function getProjectDetails() {
      const token = localStorage.getItem(API_KEY);

      axiosInstance(`${PROJECTS_URL}/${projectID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          lang: params.lang === "es" ? "ES" : "US",
        },
      })
        .then((res) => {
          const apiResponse = res.data.data[0];
          setProject(apiResponse);
        })
        .catch((err) => {
          console.error(
            `The following error has occurred while trying to get the details of the project with id "${projectID}"`
          );
          console.error(err);
        });
    }

    getProjectDetails();
  }, [appReady]);

  return project ? (
    <div className="bg-[#1c1e1e] min-h-screen w-full p-6 flex justify-center font-roboto">
      <div className="w-full sm:w-4/6">
        <span className="flex items-center mt-12 mb-3">
          <h2 className="text-3xl font-semibold">{project.name}</h2>
          {project.logo && (
            <img
              src={project.logo}
              alt="project_logo"
              className="w-8 h-8 ml-2"
            />
          )}
        </span>

        <div className="flex flex-wrap">
          {project.technologies &&
            project.technologies.map((t, index) => {
              return (
                <span
                  key={`project_${project.id}_technology_${t.id}`}
                  className="border border-white rounded-full px-2 py-1 m-1"
                >
                  {t.name}
                </span>
              );
            })}
        </div>

        <div className="h-6" />

        <ExternalResourceList externalResources={project.external_resources} />

        <MarkdownSection content={project.long_description} />

        <ProjectBlogs />
      </div>
    </div>
  ) : (
    <ProjectDetailsLoading />
  );
}
