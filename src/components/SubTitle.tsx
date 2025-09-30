import styles from "../css/SubTitle.module.css";
import { useAnimation } from "./AnimationProvider";

export default function SubTitle() {
  const { homeVisited } = useAnimation();

  return (
    <div
      className={
        !homeVisited.current ? styles.subtitle : styles.subtitle_no_anim
      }
    >
      <div>
        <h2 className="text-2xl sm:text-4xl font-medium">DEVELOPER</h2>
      </div>
    </div>
  );
}
