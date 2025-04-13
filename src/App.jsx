import { Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import RoomForm from "./pages/RoomForm";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const App = () => {
  const isDarkMode = useSelector((state) => state.game.darkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex flex-col min-h-[130vh] items-center relative">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<RoomForm />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>

      <Footer />
    </div>
  );
};

export default App;
