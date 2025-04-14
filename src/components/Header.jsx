import { useDispatch, useSelector } from "react-redux";
import RenderImage from "../utils/RenderImage";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { resetRoomState } from "../store/actions/roomActions";
import { resetTypingState } from "../store/actions/typingActions";
import { resetGameState, setDarkMode } from "../store/actions/gameActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDarkMode = useSelector((state) => state.game.darkMode);

  const handleHome = () => {
    dispatch(resetGameState());
    dispatch(resetRoomState());
    dispatch(resetTypingState());
    navigate("/");
  };

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
          typo
        </div>
        <div className="text-3xl hidden md:flex">
          A realtime typing competition app
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center">
        <span
          className="text-xl cursor-pointer pr-6 border-r-2"
          onClick={handleHome}
        >
          Home
        </span>
        <span className="cursor-pointer pr-2" onClick={changeTheme}>
          <RenderImage name="darkMode" />
        </span>
      </div>
    </div>
  );
};
export default Header;
