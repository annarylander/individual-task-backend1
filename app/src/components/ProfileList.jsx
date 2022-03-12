import React from "react";
import { Link } from "react-router-dom";

export default function Profile(props) {

  const user = props.user
  

  return (
    <div className="container">
      <h2>Personer att följa:</h2>

      {user &&
        user.map((item, index) => {
          return (
            <div key={index}>
              <Link to={`/users/${item._id}`}>
                <p>{item.username}</p>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
