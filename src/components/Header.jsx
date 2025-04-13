import { useDispatch, useSelector } from "react-redux";
import RenderImage from "../utils/RenderImage";
import { setDarkMode } from "../store/actions/gameActions";
import classNames from "classnames";

const Header = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.game.darkMode);

  const changeTheme = () => {
    dispatch(setDarkMode(!isDarkMode));
  };
  return (
    <div
      className={classNames(
        "w-[90%] rounded-md shadow-md p-6 flex items-center justify-between mt-4 ",
        {
          "bg-ternary": !isDarkMode,
          "bg-dternary text-white": isDarkMode,
        },
      )}
    >
      <div className="flex flex-row gap-5">
        <div
          className={classNames(
            "font-pixelify text-4xl font-bold cursor-pointer pr-4 border-r-2 flex flex-row",
            {
              "border-primary": !isDarkMode,
              "border-dprimary": isDarkMode,
            },
          )}
        >
          typo<span>😔</span>
        </div>
        <div className="text-3xl hidden md:flex">
          A realtime typing competition app
        </div>
      </div>
      <span className="cursor-pointer" onClick={changeTheme}>
        <RenderImage name="darkMode" />
      </span>
    </div>
  );
};
export default Header;
