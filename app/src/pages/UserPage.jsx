import React, { useState, useEffect } from "react";
import ProfileList from "../components/ProfileList";

export default function UserPage() {

    const [user, setUser] = useState([]);

    useEffect(() => {
      const url = "http://localhost:8000/users";
  
      fetch(url)
        .then((res) => res.json())
        .then((data) => setUser(data.users));
        
    }, []);

  return (
    <div>
        <ProfileList user={user} />
    </div>
  )
}
