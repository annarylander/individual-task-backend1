import React, {useState} from 'react'

export default function ProfilePageEdit() {

    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("")
    // const [username, setUsername] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    

    function updateUser(e) {
        e.preventDefault()
        const payload = {email, fullname}
        const url = "http://localhost:8000/profile"
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

    const fileSelectedHandler = event => {
        console.log(event)
    }

  return (
    <div className='user-create'>
        <h2>Redigera profil</h2>
         <form onSubmit={updateUser}> 

         {/* <label>Användarnamn</label>
            <input
                type="text"
                value= {username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}></input> */}

            <label>Namn</label>
            <input
                type="text"
                value= {fullname}
                placeholder="Full name"
                onChange={(e) => setFullname(e.target.value)}></input>
              
            <label>Email</label>
            <input
                type="text"
                value= {email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}></input>

            <label>Profilbild</label>
            <input
                type="file"
                value= {selectedFile}
                onChange={(e) => setSelectedFile(e.target.files[0])}></input>
                
                <button type="submit">Uppdatera</button>
        </form>
    </div>
  )
}
