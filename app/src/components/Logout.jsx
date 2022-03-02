import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";

export default function Logout() {
    
    const navigate = useNavigate();

    function handleClick () {
        localStorage.removeItem("token");
        navigate("/");
    }
  return (
    <div>
        <button onClick={handleClick}>Log out</button>
    </div>
    
  )
}
