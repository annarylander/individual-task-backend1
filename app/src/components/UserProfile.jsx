import React, { useState } from "react";
import { useParams } from "react-router-dom";
import jwt from "jsonwebtoken";

export default function UserProfile(props) {
  const { _id } = useParams();

  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");

  function followUser() {
    const url = `http://localhost:8000/users/${_id}/follow`;
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function unfollowUser() {
    const url = `http://localhost:8000/users/${_id}/unfollow`;
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const loggedInUserId = jwt.decode(localStorage.getItem("token")).userId;

  return (
    <div className="user-create">
      <div className="card">
        <h2>{props.user.username}</h2>
        <img src={props.user.image} alt="profilbild" height="80px" />
        <p>Användarnamn: {props.user.username}</p>
        <p>Namn: {props.user.fullname}</p>
        <p>E-post: {props.user.email}</p>
        <div className="followers">
          <p>
            Följer <span>{props.user.following.length}</span>
          </p>
          <p>
            Följare <span>{props.user.followers.length}</span>
          </p>
          <button onClick={followUser}>Följ</button>
          <button onClick={unfollowUser}>Avfölj</button>
        </div>
      </div>
    </div>
  );
}
