import React, { useState, useEffect } from "react";
import BlogList from "../components/BlogList";
import PostCreate from "../components/PostCreate";

export default function () {

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
    <div>
      <PostCreate />
      <BlogList blog={blog}  />
    </div>
  );
}
