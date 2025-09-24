import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import EndPage from "./pages/EndPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/end" element={<EndPage />} />
      </Routes>
    </BrowserRouter>
  );
}
