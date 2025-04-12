import RenderImage from "../utils/RenderImage";

const Header = () => {
  return (
    <div className="w-[90%] rounded-md bg-ternary shadow-md p-6 flex items-center justify-between mt-4">
      <div className="font-pixelify text-4xl font-bold">typo<span>😔</span></div>
      <RenderImage name="darkMode" />
    </div>
    
  );
};
export default Header;
