import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";

export default function Feed() {

    const [blog, setBlog] = useState([])

    useEffect(() => {
        const url = "http://localhost:8000/feed";
        const token = localStorage.getItem("token")

        fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }})
        
        .then((res) => res.json())
        .then((data) => setBlog(data.blogs))
        
        
    }, [])

  return (
    
    <div className="user-create">
        <h2>Feed</h2>

        {blog &&
        blog.map((item, index) => {
            return <div className="card" key={index}>
                    <p>{item.body}</p>
                    <Link to={"/profile"}>By: {item.postedByName}</Link>
                    <p>{item.published}</p>
                    <br></br>
            </div>
        })}
    </div>
  )
}