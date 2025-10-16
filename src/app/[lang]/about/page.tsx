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
import styles from "@/css/CommonAnimations.module.css";

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
    <div className="bg-[#1c1e1e] w-full min-h-screen flex justify-center font-roboto pt-6 sm:p-6 overflow-hidden">
      <div className="w-4/6">
        <h2
          className={`text-3xl font-semibold mb-6 mt-12 ${
            !userDetails ? "animate-pulse" : ""
          }`}
          style={{
            animationDelay: "200ms",
          }}
        >
          {textByLanguage.title[lang]}
        </h2>

        {userDetails ? (
          <div className={styles.unfold}>
            <MarkdownSection content={userDetails.long_description} />
          </div>
        ) : (
          <div className="w-full h-64 animate-pulse rounded-2xl bg-[#252828]" />
        )}

        <Separator gap="h-24 sm:h-36" />

        <div className="p-2 sm:p-6 rounded-md">
          <SkillList
            title={textByLanguage.technicalSkills[lang]}
            items={userDetails?.technologies}
          />
        </div>

        <div className="mt-12 bg-[#252828] p-2 sm:p-6 rounded-md">
          <SkillList
            title={textByLanguage.softSkills[lang]}
            items={userDetails?.skills}
            loadingBgColor="bg-[#1c1e1e]"
          />
        </div>

        <Separator gap="h-24 sm:h-36" />

        <EducationsList educations={userDetails?.educations} lang={lang} />

        <Separator gap="h-24 sm:h-36" />

        <ExperiencesList experiences={userDetails?.experiences} lang={lang} />

        <Separator gap="h-24 sm:h-36" />
      </div>
    </div>
  );
}
