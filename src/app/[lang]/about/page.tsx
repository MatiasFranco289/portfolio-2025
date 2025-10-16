"use client";
import { User } from "@/app/interfaces";
import axiosInstance from "@/axios";
import EducationsList from "@/components/EducationsList";
import ExperiencesList from "@/components/ExperiencesList";
import { useGlobal } from "@/components/GlobalProvider";
import MarkdownSection from "@/components/MarkdownSection";
import Separator from "@/components/Separator";
import SkillList from "@/components/SkillList";
import { API_KEY, USER_DETAILS_URL } from "@/constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function About() {
  const { appReady } = useGlobal();
  const params = useParams();
  const [userDetails, setUserDetails] = useState<User>();
  const lang = params.lang as "es" | "en";
  const textByLanguage = {
    technicalSkills: {
      es: "Habilidades técnicas",
      en: "Technical skills",
    },
    softSkills: {
      es: "Habilidades blandas",
      en: "Soft skills",
    },
    title: {
      es: "Sobre mí",
      en: "About me",
    },
  };

  useEffect(() => {
    if (!appReady) return;

    async function getUserDetails() {
      const token = localStorage.getItem(API_KEY);

      axiosInstance
        .get(USER_DETAILS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            lang: params.lang === "es" ? "ES" : "US",
          },
        })
        .then((res) => {
          const apiResponse = res.data.data[0];
          setUserDetails(apiResponse);
        })
        .catch((err) => {
          console.error(
            `The following error has occurred while trying to get the details of the user with id 3: `
          );
          console.error(err);
        });
    }

    getUserDetails();
  }, [appReady]);

  return (
    <div className="bg-[#1c1e1e] w-full min-h-screen flex justify-center font-roboto p-6">
      {userDetails && (
        <div className="w-4/6">
          <h2 className="text-3xl font-semibold mb-3 mt-12">
            {textByLanguage.title[lang]}
          </h2>
          <MarkdownSection content={userDetails?.long_description} />
          <Separator />
          <div className="p-6">
            <SkillList
              title={textByLanguage.technicalSkills[lang]}
              skills={userDetails.technologies.map((t) => t.name)}
            />
          </div>

          <div className="mt-12 bg-[#252828] p-6">
            <SkillList
              title={textByLanguage.softSkills[lang]}
              skills={userDetails.skills.map((s) => s.name)}
            />
          </div>

          <Separator />

          <EducationsList educations={userDetails.educations} lang={lang} />

          <Separator />

          <ExperiencesList experiences={userDetails.experiences} lang={lang} />

          <Separator />
        </div>
      )}
    </div>
  );
}
