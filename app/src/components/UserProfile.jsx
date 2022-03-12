import React from "react";

export default function UserProfile(props) {
  // console.log(props.user);

  return (
    <div className="user-create">
      <div className="card">
        <h2>{props.user.username}</h2>
        <img src={props.user.image} alt="profilbild" height="80px" />
        <p>Användarnamn: {props.user.username}</p>
        <p>Namn: {props.user.fullname}</p>
        <p>E-post: {props.user.email}</p>
      </div>
    </div>
  );
}
