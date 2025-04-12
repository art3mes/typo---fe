import { Routes, Route } from "react-router-dom";
import RoomForm from "./pages/RoomForm";
import Lobby from "./pages/Lobby";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RoomForm />} />
      <Route path="/lobby" element={<Lobby />} />
    </Routes>
  );
};

export default App;
