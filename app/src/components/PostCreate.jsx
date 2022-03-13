import React, { useState } from "react";

export default function PostCreate() {
  const [body, setBody] = useState("");

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { body };
    const url = "http://localhost:8000/blog";
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label>Whats on your mind?</label>

        <textarea
          type="text"
          placeholder="Skriv något"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="submit">Skicka</button>
      </form>
    </div>
  );
}
