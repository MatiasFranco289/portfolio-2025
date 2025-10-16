import { Skill, Technology } from "@/app/interfaces";
import styles from "@/css/CommonAnimations.module.css";

interface SkillListProps {
  title: string;
  items: Array<Skill | Technology> | undefined;
  loadingBgColor?: string;
}

export default function SkillList({
  title,
  items,
  loadingBgColor = "bg-[#252828]",
}: SkillListProps) {
  const defaultItems = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center">
      <div className="flex flex-col justify-center items-center w-full">
        <h3 className="text-xl text-nowrap font-semibold sm:mr-6">{title}</h3>

        <h3 className="text-xl text-nowrap font-semibold mr-6 invisible">
          Technical skills
        </h3>
      </div>

      {items ? (
        <div className="flex flex-row flex-wrap justify-center">
          {items.map((i, index) => {
            return (
              <div
                key={`${title}_${index}`}
                className={styles.up_item}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="border border-white px-2 py-1 rounded-full m-2 text-center text-sm sm:text-base">
                  {i.name}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center">
          {defaultItems.map((i, index) => {
            return (
              <div
                className={`${loadingBgColor} rounded-full m-2 w-24 h-8 animate-pulse`}
                style={{ animationDelay: `${index * 100}ms` }}
                key={`loading_${title}_${index}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
