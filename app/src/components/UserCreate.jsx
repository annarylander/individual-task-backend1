import React, {useState} from 'react'

export default function UserCreate() {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")


    function handleOnSubmit(e) {
        e.preventDefault()
        const payload = {username, password}
        const url = "http://localhost:8000/users"
    
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        .then (setMessage("Ditt konto har skapats"))
    }


  return (
    <div className='user-create' >
        
         <form onSubmit={handleOnSubmit}> 
         <h2> Har du inget konto? </h2>
            <input
                type="text"
                placeholder="Namn"
                value= {username}
                onChange={(e) => setUserName(e.target.value)}
        />
             <input
                type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
        />
        <button type="submit">Skapa konto</button>
        <div className="signupMessage">{message}</div>
         </form>
         
    </div>
  )
}
