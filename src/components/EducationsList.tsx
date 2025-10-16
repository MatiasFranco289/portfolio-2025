import { Education } from "@/app/interfaces";
import { getMonthName } from "@/utils";
import { LuDot } from "react-icons/lu";
import Separator from "./Separator";

interface EducationsListProps {
  educations: Array<Education>;
  lang: "en" | "es";
}
export default function EducationsList({
  educations,
  lang,
}: EducationsListProps) {
  const texts = {
    present: {
      es: "Actualidad",
      en: "Present",
    },
    title: {
      es: "Estudios",
      en: "Education",
    },
  };

  return (
    <div className="font-roboto">
      <h3 className="text-2xl font-semibold">{texts.title[lang]}</h3>
      {educations.map((education, index) => {
        const startDate = education.start_date.split("T")[0];
        const endDate = education.end_date?.split("T")[0] || "";
        const startMonth = getMonthName(startDate, lang);
        const endMonth = getMonthName(endDate, lang);
        const startYear = startDate.split("-")[0];
        const endYear = endDate.split("-")[0];

        return (
          <div
            key={`education_${education.id}`}
            className="flex flex-row items-center items-stretch"
          >
            <div className="relative flex justify-center items-center mr-10">
              <div className="w-4 aspect-square bg-white rounded-full" />

              {index === 0 && (
                <div className="absolute bg-white w-1 top-[50%] h-3/6" />
              )}

              {index !== 0 && index !== educations.length - 1 && (
                <div className="absolute bg-white w-1 top-0 h-full" />
              )}

              {index === educations.length - 1 && (
                <div className="absolute bg-white w-1 bottom-[50%] h-3/6" />
              )}
            </div>

            <div
              className={`my-6 w-full p-4 ${
                index % 2 === 0 ? "bg-[#252828]" : ""
              }`}
            >
              <h4 className="text-lg font-semibold">{education.institution}</h4>
              <p>{education.field}</p>

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

                <p>{education.location}</p>
              </div>

              <p className="mt-2">{education.description}</p>
              <Separator gap="h-2" width="w-3/6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
