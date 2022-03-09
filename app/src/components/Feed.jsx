import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import moment from "moment";


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
        .then((data) => setBlog(data))
      
        
        
    }, [])

   

  return (
    
    <div className="user-create">
        <h2>Feed</h2>

        {blog &&
        blog.map((item, index) => {
            return <div className="card" key={index}>
                    <p>{item.postedByID.username}</p>
                    <p>{item.body}</p>
                    <p> {moment(item.published).fromNow()}</p>
                    <img src={item.postedByID.image} alt="profilbild" height="40px"/>
                    
                    {/* <Link to={"/profile"}>By: {item.postedByName}</Link>
                    
                    <img src={item.postedByID.image} alt="profilbild" height="80px"/> */}
                    <br></br>
            </div>
        })}
    </div>
  )
}