"use client";
import axiosInstance from "@/axios";
import { useGlobal } from "@/components/GlobalProvider";
import { API_KEY, PROJECTS_URL } from "@/constants";
import { useEffect, useState } from "react";
import { Project } from "../interfaces";

export default function Projects() {
  const { appReady } = useGlobal();
  const [projects, setProjects] = useState<Array<Project> | undefined>();

  useEffect(() => {
    if (!appReady) return;
    getProject();

    async function getProject() {
      const jwt = localStorage.getItem(API_KEY);

      axiosInstance
        .get(PROJECTS_URL, {
          headers: {
            Authorization: `Bearer ${jwt}`,
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

  return <div></div>;
}
