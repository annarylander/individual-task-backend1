import React, {useState, useEffect} from "react"


export default function Feed() {

    const [blog, setBlog] = useState([])

    useEffect(() => {
        const url = "http://localhost:8000/feed";

        fetch(url)
        .then((res) => res.json())
        .then((data) => setBlog(data.blogs))
        
        
    }, [])

  return (
    <div className="container">
        <h2>Feed</h2>

        {blog &&
        blog.map((item, index) => {
            return <div key={index}>
                    <p>{item.body}</p>
                    <p>By: {item.postedByName}</p>
                    <p>{item.published}</p>
                    <br></br>
            </div>
        })}
    </div>
  )
}