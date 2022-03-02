import React, {useState} from 'react'

export default function PostCreate() {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [message, setMessage] = useState("")
    
    function handleOnSubmit(e) {
        e.preventDefault()
        const payload = {title, body}
        const url = "http://localhost:8000/message"
        const token = localStorage.getItem("token")
        console.log(payload)
    
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        })
    }

  return (
    <div>
        <h2>Skriv något:</h2>
        <form onSubmit={handleOnSubmit}> 
            <input
                type="text"
                placeholder="titel "
                value= {title}
                onChange={(e) => setTitle(e.target.value)}
        />
                    <input
                type="text"
                placeholder="Skriv något"
                value= {body}
                onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Skicka</button>
         </form>
    </div>
  )
}
