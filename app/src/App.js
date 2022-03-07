import React from "react"
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import ProfilePageEdit from "./pages/ProfilePageEdit";


function App() {
  return (
    <div className="App">
    <Header />

    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile-edit" element={<ProfilePageEdit />} />
        <Route path="/profile" element={<ProfilePage />} />
    </Routes>
      
    
  
    </div>
  );
}

export default App;
