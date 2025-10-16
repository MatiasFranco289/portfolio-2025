import { ExternalResource } from "@/app/interfaces";
import { FaGithub } from "react-icons/fa";
import { FaBitbucket } from "react-icons/fa";
import { RiGitRepositoryLine } from "react-icons/ri";
import { FaJira } from "react-icons/fa";
import { FaTrello } from "react-icons/fa";
import { FaConfluence } from "react-icons/fa";
import { FaGoogleDrive } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { IoIosLink } from "react-icons/io";
import styles from "@/css/CommonAnimations.module.css";

interface ExternalResourceListProps {
  externalResources: Array<ExternalResource>;
}

export default function ExternalResourceList({
  externalResources,
}: ExternalResourceListProps) {
  const externalResourceIcons = {
    GITHUB: <FaGithub className="text-xl" />,
    BITBUCKET: <FaBitbucket className="text-xl" />,
    OTHER_REPO: <RiGitRepositoryLine className="text-xl" />,
    JIRA: <FaJira className="text-xl" />,
    TRELLO: <FaTrello className="text-xl" />,
    CONFLUENCE: <FaConfluence className="text-xl" />,
    DRIVE: <FaGoogleDrive className="text-xl" />,
    OTHER: <IoIosDocument className="text-xl" />,
    WEB: <IoIosLink className="text-xl" />,
  };

  return (
    <div className="space-y-2 mb-3 flex flex-col items-start">
      {externalResources.map((resource, index) => {
        return (
          <div
            key={`resource_${index}`}
            className={styles.left_item}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="flex items-center hover:scale-105 duration-200">
              {externalResourceIcons[resource.type]}
              <a href={resource.url} target="_blank" className="underline ml-2">
                {resource.name}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
