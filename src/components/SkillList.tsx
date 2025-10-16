interface SkillListProps {
  title: string;
  skills: Array<string>;
}

export default function SkillList({ title, skills }: SkillListProps) {
  return (
    <div className="flex flex-row items-center">
      <div>
        <h3 className="text-xl text-nowrap font-semibold mr-6">{title}</h3>

        <h3 className="text-xl text-nowrap font-semibold mr-6 invisible">
          Technical skills
        </h3>
      </div>

      <div className="flex flex-row flex-wrap">
        {skills.map((s, index) => {
          return (
            <div
              className="border border-white px-2 py-1 rounded-full m-2"
              key={`${title}_${index}`}
            >
              {s}
            </div>
          );
        })}
      </div>
    </div>
  );
}
