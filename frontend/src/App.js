import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home/HomePage";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import Navbar from "./components/navbar/Navbar";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/UserContext";
import Dashboard from "./components/dashboard/Dashboard";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
