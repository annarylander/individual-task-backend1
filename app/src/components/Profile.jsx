import React, {useState, useEffect} from "react"


export default function Profile() {

    const [user, setUser] = useState([])

    useEffect(() => {
        const url = "http://localhost:8000/people";

        fetch(url)
        .then((res) => res.json())
        .then((data) => setUser(data.users))
        
        
    }, [])

  return (
    <div className="container">
        <h2>People</h2>

        {user &&
        user.map((item, index) => {
            return <div key={index}>
                    <p> {item.username}</p>
            </div>
        })}
    </div>
  )
}
