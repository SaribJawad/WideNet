import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div className="font-poppins text-[#FAFAFA] bg-[#1A1A1A] min-h-[100vh] min-w-screen">
      <Navbar />
      <Routes>
        <Route index element={<ProtectedRoute Component={HomePage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
