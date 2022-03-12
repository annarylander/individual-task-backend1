import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import UserProfile from "./UserProfile";

export default function ProfileDetail() {
  const { _id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    const url = `http://localhost:8000/users/${_id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      
  }, []);


  return (
    <div className="user-create">
      {data && (
        <div>
          <h2>Profil</h2>
          <UserProfile user={data.user} />
        </div>
      )}

      {data &&
        data.blog.map((item, index) => {
          return (
            <div className="card-post" key={index}>
              <div className="card-image">
                <img
                  src={item.postedByID.image}
                  alt="profilbild"
                  height="50px"
                />
              </div>
              <p className="username">{item.postedByID.username}</p>{" "}
              <div className="card-text">
                <p>{item.body}</p>

                <p className="timestamp"> {moment(item.published).fromNow()}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
