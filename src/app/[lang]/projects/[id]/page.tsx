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
import ProjectDetailsLoading from "@/components/ProjectDetailsLoading";
import styles from "@/css/CommonAnimations.module.css";

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
    <div className="bg-[#1c1e1e] min-h-screen w-full p-3 pt-6 sm:p-6 flex justify-center font-roboto">
      <div className="w-full sm:w-4/6">
        <div className="flex flex-row flex-wrap justify-between items-center mt-12 mb-6">
          <div className="flex items-center">
            <h2 className="text-3xl font-semibold">{project.name}</h2>

            {project.logo && (
              <img
                src={project.logo}
                alt="project_logo"
                className="w-8 h-8 ml-2"
              />
            )}
          </div>

          <div className="flex flex-wrap space-x-2 text-sm ml-6 text-white/60">
            <div>{project.start_date.split("T")[0]}</div>

            <div>-</div>

            {project.end_date ? (
              <div>{project.end_date.split("T")[0]}</div>
            ) : project.estimated_end ? (
              <div>{project.estimated_end.split("T")[0] + "(Estimated)"}</div>
            ) : (
              <div>????-??-??</div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap">
          {project.technologies &&
            project.technologies.map((t, index) => {
              return (
                <div
                  key={`project_${project.id}_technology_${t.id}`}
                  className="m-2"
                >
                  <div
                    className={styles.up_item}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <span className="border border-white rounded-full px-2 py-1">
                      {t.name}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="h-6" />

        <ExternalResourceList externalResources={project.external_resources} />

        <div className={styles.unfold} style={{ animationDelay: "1s" }}>
          <MarkdownSection content={project.long_description} />
        </div>

        <ProjectBlogs />
      </div>
    </div>
  ) : (
    <ProjectDetailsLoading />
  );
}
