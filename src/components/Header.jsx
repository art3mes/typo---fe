import RenderImage from "../utils/RenderImage";

const Header = () => {
  return (
    <div className="w-[90%] rounded-md bg-ternary shadow-md p-6 flex items-center justify-between mt-4">
      <div className="font-pixelify text-4xl font-bold cursor-pointer">
        typo<span>😔</span>
      </div>
      <span className="cursor-pointer"><RenderImage name="darkMode" /></span>
    </div>
  );
};
export default Header;
