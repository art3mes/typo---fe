import { Routes, Route } from "react-router-dom";
import RoomForm from "./pages/RoomForm";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<RoomForm />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
