import Title from "@/components/Title";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1c1e1e] flex justify-center items-center  font-roboto">
      <div className="space-y-4 relative p-12">
        <Title />

        <div className="absolute border-t-2 border-white h-1 w-32 top-0 left-0" />
        <div className="absolute border-l-2 border-white h-32 w-1 top-0 left-0" />

        <div className="absolute border-b-2 border-white h-1 w-32 bottom-0 right-0" />
        <div className="absolute border-r-2 border-white h-32 w-1 bottom-0 right-0" />

        <div>
          <h2 className="text-4xl font-medium">DEVELOPER</h2>
        </div>

        <div className="flex flex-row space-x-4 justify-end border-white">
          <FaGithub className="text-5xl" />
          <FaLinkedin className="text-5xl" />
          <IoMailSharp className="text-5xl" />
        </div>
      </div>
    </div>
  );
}
