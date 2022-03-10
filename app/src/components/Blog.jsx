import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";

export default function Feed() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const url = "http://localhost:8000/blog";
    const token = localStorage.getItem("token");

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBlog(data.blogs))
      .then(console.log(blog));
  }, []);

  return (
    <div className="user-create">
      {blog &&
        blog.map((item, index) => {
          return (
            <div className="card-post" key={index}>
              <div className="card-image">
                <img
                  src={item.postedByID.image}
                  alt="profilbild"
                  height="50px"
                />
              </div>
              <Link to={`/users/${item.postedByID._id}`}> <p className="username">{item.postedByID.username}</p> </Link>
              <div className="card-text">
              
          
                <Link to={`/blog/${item._id}`}>
                  {" "}
                  <p>{item.body}</p>
                </Link>
                
                <p className="timestamp"> {moment(item.published).fromNow()}</p>
              </div>

              <div className="likes">
                <ThumbUpAltOutlinedIcon fontSize="small" className="icon" />
                <ModeCommentOutlinedIcon fontSize="small" className="icon" />
                <ReplyOutlinedIcon fontSize="small" className="icon" />
              </div>
            </div>
          );
        })}
    </div>
  );
}
