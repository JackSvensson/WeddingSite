import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeddingSite from "./pages/WeddingSite";
import AdminPage from "./pages/AdminPage";
import "./styles/wedding.css";

export default function App() {
  return (
    <BrowserRouter>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&display=swap"
        rel="stylesheet"
      />
      <Routes>
        <Route path="/" element={<WeddingSite />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}