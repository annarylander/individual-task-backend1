import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { username, password };
    const url = "http://localhost:8000/auth";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.token;
        localStorage.setItem("token", token);
        navigate("/blog");
      });
  }

  return (
    <div className="user-create">
      <form onSubmit={handleOnSubmit}>
        <h2> Logga in</h2>
        <input
          type="text"
          placeholder="Namn"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
}
