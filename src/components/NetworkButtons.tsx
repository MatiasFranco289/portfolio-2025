import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "../constants";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import styles from "../css/NetworkButtons.module.css";
import { useGlobal } from "./GlobalProvider";
import { copyToClipboard } from "@/utils";
import { toast } from "react-toastify";
import toastStyles from "../css/Toast.module.css";

export default function NetworkButtons() {
  const { homeVisited } = useGlobal();

  return (
    <div
      className={
        !homeVisited.current
          ? styles.network_buttons
          : styles.network_buttons_no_anim
      }
    >
      <span className="hover:scale-110 duration-200">
        <a href={GITHUB_URL} target="_blank">
          <FaGithub className="text-3xl sm:text-5xl" />
        </a>
      </span>

      <span className="hover:scale-110 duration-200">
        <a href={LINKEDIN_URL} target="_blank">
          <FaLinkedin className="text-3xl sm:text-5xl" />
        </a>
      </span>

      <span className="hover:scale-110 duration-200 ">
        <button
          className="cursor-pointer outline-none"
          onClick={() => {
            copyToClipboard(EMAIL, () => {
              toast.success("Email copied to cliboard.", {
                theme: "dark",
                className: toastStyles.info_toast,
                progressClassName: toastStyles.info_toast_bar,
                icon: false,
                position: "top-left",
              });
            });
          }}
        >
          <IoMailSharp className="text-3xl sm:text-5xl" />
        </button>
      </span>
    </div>
  );
}
