import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <div className="font-poppins text-[#FAFAFA] bg-[#1A1A1A] min-h-[100vh] w-full min-w-[500px]">
      <Navbar />
      <Routes>
        <Route index element={<ProtectedRoute Component={HomePage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}

export default App;
