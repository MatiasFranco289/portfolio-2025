export default function ProjectDetailsLoading() {
  const elements = [1, 2, 3, 4];

  return (
    <div className="bg-[#1c1e1e] min-h-screen w-full p-6 flex justify-center font-roboto">
      <div className="w-full sm:w-4/6">
        <div className="bg-[#252828] h-12 w-3/6 mt-12 animate-pulse" />

        <div className="flex flex-wrap mt-1">
          {elements.map((_e, index) => {
            return (
              <div
                className="bg-[#252828] rounded-full px-2 w-20 h-8 py-1 m-1 animate-pulse"
                key={`loading_technology_${index}`}
                style={{ animationDelay: `${index * 300}ms` }}
              />
            );
          })}
        </div>

        <div className="h-6" />

        <div className="space-y-2 mb-3">
          {elements.map((_e, index) => {
            return (
              <div
                className="bg-[#252828] w-64 h-8 animate-pulse"
                key={`loading_resource_${index}`}
                style={{ animationDelay: `${index * 300}ms` }}
              />
            );
          })}
        </div>

        <div className="bg-[#252828] px-4 py-2 rounded-2xl w-full h-112 animate-pulse" />
      </div>
    </div>
  );
}
