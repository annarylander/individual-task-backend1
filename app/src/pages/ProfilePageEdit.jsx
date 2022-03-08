import React, {useState} from 'react'

export default function ProfilePageEdit() {

    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("")
    // const [username, setUsername] = useState("")
    const [image, setImage] = useState("")


    function updateUser(e) {
        e.preventDefault()
        console.log("test")
        
        const url = "http://localhost:8000/profile"
        const token = localStorage.getItem("token")
       
        const formData = new FormData()
    formData.append("email", email )
    formData.append("fullname", fullname )
    formData.append("image", image)
    
        fetch(url, {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
        .then(res => console.log(res))
    }

    
   

  return (
    <div className='user-create'>
        <h2>Redigera profil</h2>
         <form onSubmit={updateUser} encType="multipart/form-data"> 

         {/* <label>Användarnamn</label>
            <input
                type="text"
                value= {username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}></input> */}

            <label>Namn</label>
            <input
                type="text"
                // value= {fullname}
                placeholder="Full name"
                onChange={(e) => setFullname(e.target.value)}></input>
              
            <label>Email</label>
            <input
                type="text"
                // value= {email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}></input>

            <label>Profilbild</label>
            <input
                type="file"
                // value= {image}
                // accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}></input>
                
                <button type="submit">Uppdatera</button>
        </form>
    </div>
  )
}
