import styles from "../css/TitleBorders.module.css";
import { useGlobal } from "./GlobalProvider";

export default function TitleBorders() {
  const { homeVisited } = useGlobal();

  return (
    <div
      className={
        !homeVisited.current
          ? styles.title_borders
          : styles.title_borders_no_anim
      }
    >
      <div className="absolute border-t-2 border-white h-1 top-0 left-0" />
      <div className="absolute border-l-2 border-white w-1 top-0 left-0" />

      <div className="absolute border-b-2 border-white h-1 bottom-0 right-0" />
      <div className="absolute border-r-2 border-white w-1 bottom-0 right-0" />
    </div>
  );
}
