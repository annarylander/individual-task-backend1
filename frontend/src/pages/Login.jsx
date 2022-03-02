import React, {useState, useEffect} from 'react'

export default function Login() {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const url = "http://localhost:8000/auth";
        const payload = {username, password}
        
        fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
         
      }, []);
    
      
    function handleOnSubmit(e) {
        e.preventDefault()
        const payload = {username, password}
        const url = "http://localhost:8000/auth"
    
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        .then((res) => res.json())
        .then((data) => {
        const token = data.token;
        localStorage.setItem("token", token);
        
      });
    }

  return (
    <div className='user-create' >
        <h2> Logga in</h2>
         <form onSubmit={handleOnSubmit} > 
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
        <button type="submit">Logga in</button>
        
         </form>
         
    </div>
  )
}
