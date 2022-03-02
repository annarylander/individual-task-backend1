import React, {useState} from 'react'

export default function UserCreate() {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");


    function handleOnSubmit(e) {
        e.preventDefault()
        const payload = {username, password}
        console.log(payload)
        const url = "http://localhost:8000/users"
    
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            
        })
    }


  return (
    <div>
        <h2> Create user </h2>
         <form onSubmit={handleOnSubmit}> 
            <input
                type="text"
                placeholder="Name"
                value= {username}
                onChange={(e) => setUserName(e.target.value)}
        />
             <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
         </form>
    </div>
  )
}
