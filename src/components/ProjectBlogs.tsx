import { useEffect, useRef, useState } from "react";
import { useGlobal } from "./GlobalProvider";
import axiosInstance from "@/axios";
import { API_KEY, BLOGS_URL, PROJECTS_URL } from "@/constants";
import { useParams } from "next/navigation";
import { Blog } from "@/app/interfaces";
import MarkdownSection from "./MarkdownSection";

export default function ProjectBlogs() {
  const { appReady } = useGlobal();
  const params = useParams();
  const projectID = params.id;
  const [blogs, setBlogs] = useState<Array<Blog>>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);

  const limit = 5;
  const offset = useRef<number>(0);
  const totalBlogs = useRef<number>(0);

  useEffect(() => {
    if (!appReady) return;
    getBlogsFromProject();
  }, [appReady]);

  async function getBlogsFromProject() {
    const token = localStorage.getItem(API_KEY);
    setLoadingBlogs(true);

    axiosInstance
      .get(`${PROJECTS_URL}/${projectID}${BLOGS_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          lang: params.lang === "es" ? "ES" : "US",
          offset: offset.current,
          limit: limit,
        },
      })
      .then((res) => {
        const apiResponse = res.data.data;
        totalBlogs.current = res.data.pagination.total;
        setBlogs([...blogs, ...apiResponse]);
      })
      .catch((err) => {
        console.error(
          `The following error has occurred while trying to load the blogs of the project with id ${projectID}: `
        );
        console.error(err);
      })
      .finally(() => {
        setLoadingBlogs(false);
      });
  }

  function loadMoreBlogs() {
    if (loadingBlogs) return;

    offset.current += limit;
    getBlogsFromProject();
  }

  return (
    blogs && (
      <div className="font-roboto">
        <div className="h-36 w-full flex items-center justify-center">
          <div className="border border-white w-6/6 h-[1px] mt-12" />
        </div>

        <h3 className="text-3xl font-semibold">Blogs</h3>

        <div className="space-y-12">
          {blogs.map((blog, index) => {
            return (
              <div key={`blog_${index}`}>
                <div className="border border-white w-2/6 h-[1px] mt-12" />
                <div className="my-2">
                  <h3 className="text-xl font-semibold">{blog.title}</h3>
                  <p className="text-sm">{blog.created_at.split("T")[0]}</p>
                </div>

                <MarkdownSection content={blog.body} />
              </div>
            );
          })}
        </div>

        {blogs.length < totalBlogs.current && (
          <div className="flex justify-center my-6">
            <button
              onClick={loadMoreBlogs}
              className={`p-3 text-lg ${
                loadingBlogs ? "animate-pulse cursor-default" : "cursor-pointer"
              }`}
            >
              {params.lang === "es" ? "Cargar más" : "Load more"}
            </button>
          </div>
        )}
      </div>
    )
  );
}
