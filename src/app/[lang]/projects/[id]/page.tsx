"use client";
import { ProjectDetails as ProjectDetailsI } from "@/app/interfaces";
import axiosInstance from "@/axios";
import { useGlobal } from "@/components/GlobalProvider";
import MarkdownSection from "@/components/MarkdownSection";
import { API_KEY, PROJECT_DETAILS_URL } from "@/constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectDetails() {
  const { appReady } = useGlobal();
  const params = useParams();
  const projectID = params.id;
  const [project, setProject] = useState<ProjectDetailsI>();

  useEffect(() => {
    if (appReady) return;

    async function getProjectDetails() {
      const token = localStorage.getItem(API_KEY);

      axiosInstance(`${PROJECT_DETAILS_URL}/${projectID}`, {
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

  return (
    project && (
      <div className="bg-[#1c1e1e] min-h-screen w-full p-6 flex justify-center">
        <div className="w-4/6">
          <span className="flex items-center mt-12 mb-3">
            <h2 className="font-roboto text-3xl font-semibold">
              {project.name}
            </h2>
            {project.logo && (
              <img
                src={project.logo}
                alt="project_logo"
                className="w-8 h-8 ml-2"
              />
            )}
          </span>

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

          <div className="h-6" />

          <MarkdownSection content={project.long_description} />
        </div>
      </div>
    )
  );
}
