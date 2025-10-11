import { ProjectStatus, ProjectTag } from "@/app/interfaces";
import ProjectStatusTag from "./ProjectTag";
import { useParams, useRouter } from "next/navigation";
import styles from "../css/ProjectCard.module.css";
import { useEffect, useState } from "react";

interface ProjectCardProps {
  name: string;
  shortDescription: string;
  logo: string | null;
  status: ProjectStatus;
  tags: Array<ProjectTag>;
  animationDelay: number;
}

export default function ProjectCard({
  name,
  shortDescription,
  logo,
  status,
  tags,
  animationDelay,
}: ProjectCardProps) {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang || "en";
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, animationDelay);
  }, []);

  return (
    ready && (
      <div
        className={styles.project_card}
        onClick={() => {
          router.push(`/${lang}/projects/details`);
        }}
      >
        <span className="flex justify-between items-center flex-wrap">
          <span className="flex">
            <p className="font-roboto text-lg sm:text-xl">{name}</p>
            {logo && <img src={logo} alt="" className="w-8 h-8 ml-2" />}
          </span>

          <ProjectStatusTag status={status} />
        </span>

        <p className="font-roboto mt-2">{shortDescription}</p>

        <span className="flex justify-between items-end">
          <span className="flex mt-6 flex-wrap">
            {tags.map((t, index) => {
              return (
                <span
                  key={`project_${name}_tag_${index}`}
                  className="border border-white rounded-full px-2 m-1"
                >
                  {t.name}
                </span>
              );
            })}
          </span>
        </span>
      </div>
    )
  );
}
