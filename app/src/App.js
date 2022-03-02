import React from "react"
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import UserCreate from "./components/UserCreate";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";


function App() {
  return (
    <div className="App">
       <Header />

    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/feed" element={<FeedPage />} />
    </Routes>
      
    
  
    </div>
  );
}

export default App;
