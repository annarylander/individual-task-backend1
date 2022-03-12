import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <>
      <button className="logout" onClick={handleClick}>
        Logga ut
      </button>
    </>
  );
}
