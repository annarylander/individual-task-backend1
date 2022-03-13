import React, { useState } from "react";

export default function ProfileEdit() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState("");

  const formData = new FormData();
  formData.append("email", email);
  formData.append("fullname", fullname);
  formData.append("image", image);

  function updateUser(e) {
    e.preventDefault();
    const url = "http://localhost:8000/profile";
    const token = localStorage.getItem("token");
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
  }

  return (
    <div className="user-create">
      <h2>Redigera profil</h2>
      <form onSubmit={updateUser} encType="multipart/form-data">
        <label>Namn</label>
        <input
          type="text"
          placeholder="Full name"
          onChange={(e) => setFullname(e.target.value)}
        ></input>

        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label>Profilbild</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>

        <button type="submit">Uppdatera</button>
      </form>
    </div>
  );
}
