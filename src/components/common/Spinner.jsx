import classNames from "classnames";
import { useSelector } from "react-redux";

const Spinner = () => {
  const isDarkMode = useSelector((state) => state.game.darkMode);

  return (
    <div className="flex items-center justify-center">
      <div
        className={classNames(
          "w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin",
          {
            "border-ternary": !isDarkMode,
            "border-dternary": isDarkMode,
          },
        )}
      ></div>
    </div>
  );
};

export default Spinner;
