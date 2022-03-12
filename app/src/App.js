import React from "react"
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import ProfileDetail from "./components/ProfileDetail";
import BlogDetail from "./components/BlogDetail";
import UserPage from "./pages/UserPage";


function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:_id" element={<BlogDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/users/:_id" element={<ProfileDetail />} />
    </Routes>
    </div>
  );
}

export default App;
