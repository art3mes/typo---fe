import { toast } from "react-toastify";
import RenderImage from "../utils/RenderImage";
import { useSelector } from "react-redux";
import classNames from "classnames";

const Footer = () => {
  const isDarkMode = useSelector((state) => state.game.darkMode);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("arty.mohammadali@gmail.com");

    toast("Email Copied", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div
      className={classNames(
        "w-[90%] rounded-t-3xl bottom-0 py-8 flex items-center justify-between px-6",
        {
          "bg-ternary": !isDarkMode,
          "bg-dternary text-dlight": isDarkMode,
        },
      )}
    >
      <div className="text-lg font-medium">
        Created desperately by <strong>Mohammad Ali</strong>, © 2025
      </div>

      <div className="flex space-x-4 items-center">
        <div
          className="hover:underline cursor-pointer text-xl"
          onClick={handleCopyEmail}
        >
          📧
        </div>
        <a
          href="https://github.com/art3mes"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer "
        >
          <RenderImage name="github" />
        </a>
        <a
          href="https://www.linkedin.com/in/aliarty/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <RenderImage name="linkedin" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
