import React from "react"
import Profile from "./components/Profile";
import UserCreate from "./components/UserCreate";


function App() {
  return (
    <div className="App">

      <h1>Micro blog</h1>  

      <UserCreate/> 
      <Profile />  
  
    </div>
  );
}

export default App;
