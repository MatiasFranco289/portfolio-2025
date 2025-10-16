interface ProjectLoadingCardProps {
  animationDelay: number;
}

export default function ProjectLoadingCard({
  animationDelay,
}: ProjectLoadingCardProps) {
  return (
    <div
      className="bg-[#252828] rounded-2xl shadow-md min-h-44 animate-pulse p-5"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex flex-row justify-between">
        <div className="bg-[#1c1e1e] h-8 w-3/6" />
        <div className="bg-[#1c1e1e] h-8 w-2/6" />
      </div>

      <div className="bg-[#1c1e1e] h-8 w-full mt-2" />

      <div className="mt-6 flex">
        <div className="bg-[#1c1e1e] h-8 w-2/12 px-2 m-1" />
        <div className="bg-[#1c1e1e] h-8 w-2/12 px-2 m-1" />
        <div className="bg-[#1c1e1e] h-8 w-2/12 px-2 m-1" />
      </div>
    </div>
  );
}
