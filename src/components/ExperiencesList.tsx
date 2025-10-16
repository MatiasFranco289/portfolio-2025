import { Experience } from "@/app/interfaces";
import { getMonthName } from "@/utils";
import Separator from "./Separator";
import styles from "@/css/CommonAnimations.module.css";

interface ExperiencesListProps {
  experiences: Array<Experience> | undefined;
  lang: "en" | "es";
}

export default function ExperiencesList({
  experiences,
  lang,
}: ExperiencesListProps) {
  const texts = {
    title: {
      en: "Experiences",
      es: "Experiencias",
    },
    present: {
      es: "Actualidad",
      en: "Present",
    },
  };
  const defaultExperiences = [1, 2, 3];
  return (
    <div className="font-roboto">
      <h3 className="text-2xl font-semibold">{texts.title[lang]}</h3>

      {experiences
        ? experiences.map((experience, index) => {
            const startDate = experience.start_date.split("T")[0];
            const endDate = experience.end_date?.split("T")[0] || "";
            const startMonth = getMonthName(startDate, lang);
            const endMonth = getMonthName(endDate, lang);
            const startYear = startDate.split("-")[0];
            const endYear = endDate.split("-")[0];

            return (
              <div
                key={`experience_${index}`}
                className={
                  index % 2 === 0 ? styles.left_item : styles.right_item
                }
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-row items-center items-stretch">
                  <div className="relative hidden sm:flex justify-center items-center mr-10">
                    <div className="w-4 aspect-square bg-white rounded-full" />

                    {index === 0 && (
                      <div className="absolute bg-white w-1 top-[50%] h-3/6" />
                    )}

                    {index !== 0 && index !== experiences.length - 1 && (
                      <div className="absolute bg-white w-1 top-0 h-full" />
                    )}

                    {index === experiences.length - 1 && (
                      <div className="absolute bg-white w-1 bottom-[50%] h-3/6" />
                    )}
                  </div>

                  <div
                    className={`my-6 w-full p-4 rounded-xl ${
                      index % 2 === 0 ? "bg-[#252828]" : ""
                    }`}
                  >
                    <div className="flex lfex-row items-center">
                      {experience.company_logo && (
                        <div className="w-8 aspect-square mr-2 bg-white">
                          <img
                            src={experience.company_logo}
                            alt={`company_logo_${index}`}
                          />
                        </div>
                      )}

                      <h4 className="text-lg font-semibold">
                        {experience.company_name}
                      </h4>
                    </div>

                    <p className="mt-1">{experience.role}</p>

                    <div className="text-white/60">
                      <div className="flex">
                        <p>{startMonth + ". " + startYear}</p>
                        <p className="mx-2">-</p>
                        {endMonth ? (
                          <p>{endMonth + ". " + endYear}</p>
                        ) : (
                          <p>{texts.present[lang]}</p>
                        )}
                      </div>

                      <p>{experience.location}</p>
                    </div>

                    <p className="mt-2">{experience.description}</p>
                    <Separator gap="h-2" width="w-3/6" />
                  </div>
                </div>
              </div>
            );
          })
        : defaultExperiences.map((_experience, index) => {
            return (
              <div
                className="w-full bg-[#252828] h-32 my-6 animate-pulse"
                style={{ animationDelay: `${index * 200}ms` }}
                key={`default_experience_${index}`}
              />
            );
          })}
    </div>
  );
}
