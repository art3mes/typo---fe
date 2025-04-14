import classNames from "classnames";
import darkIcon from "../assets/dark.png";
import createRoom from "../assets/create.png";
import joinRoom from "../assets/join.png";
import live from "../assets/live.png";
import refresh from "../assets/refresh.png";
import reset from "../assets/reset.png";
import copy from "../assets/copy.png";
import tick from "../assets/tick.png";
import offline from "../assets/offline.png";
import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";


const imageMap = {
  darkMode: darkIcon,
  create: createRoom,
  join: joinRoom,
  live,
  refresh,
  reset,
  copy,
  tick,
  offline,
  github,
  linkedin,
};

const RenderImage = ({ name, className = "", alt = "" }) => {
  const imgSrc = imageMap[name];

  if (!imgSrc) return null;

  return (
    <img
      src={imgSrc}
      alt={alt || name}
      className={classNames("w-6 h-6 object-contain", className)}
    />
  );
};

export default RenderImage;
