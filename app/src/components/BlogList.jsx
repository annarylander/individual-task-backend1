import React from 'react'
import moment from "moment";
import { Link } from "react-router-dom";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";

export default function BlogList(props) {
    const blog = props.blog

  return (
    <div className="user-create">
    {blog &&
      blog.map((item, index) => {
        return (
          <div className="card-post" key={index}>
            <div className="card-image">
              <Link to={`/users/${item.postedByID._id}`}>
                {" "}
                <img
                  src={item.postedByID.image}
                  alt="profilbild"
                  height="50px"
                />{" "}
              </Link>
            </div>
            <Link to={`/users/${item.postedByID._id}`}>
              {" "}
              <p className="username">{item.postedByID.username}</p>{" "}
            </Link>
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
  )
}
