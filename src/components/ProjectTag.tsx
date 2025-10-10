import { ProjectStatus } from "@/app/interfaces";

interface ProjectStatusTagProps {
  status: ProjectStatus;
}

export default function ProjectStatusTag({ status }: ProjectStatusTagProps) {
  const statusColors = {
    ACTIVE: "#2ecc71",
    INACTIVE: "#95a5a6",
    PAUSED: "#f39c12",
    FINISHED: "#3498db",
    DRAFT: "#9b59b6",
    DISCARDED: "#7f8c8d",
    CANCELED: "#e74c3c",
  };

  return (
    <span
      style={{ backgroundColor: statusColors[status] }}
      className="rounded-full"
    >
      <p className="font-roboto py-1 px-2 font-[500] text-sm sm:text-base">
        {status}
      </p>
    </span>
  );
}
