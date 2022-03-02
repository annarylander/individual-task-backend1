import React, {useState, useEffect} from "react"

export default function FeedPage() {

    const [user, setUser] = useState([])

    useEffect(() => {
        const url = "http://localhost:8000/people";

        fetch(url)
        .then((res) => res.json())
        .then((data) => setUser(data.users))
        
        
    }, [])

  return (
    <div className="user-create">
        <h2>Who to follow</h2>

        {user &&
        user.map((item, index) => {
            return <div key={index}>
                    <p> Username: {item.username}</p>
            </div>
        })}
    </div>
  )
}