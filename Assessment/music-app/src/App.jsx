import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import LibraryPage from "./pages/LibraryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;