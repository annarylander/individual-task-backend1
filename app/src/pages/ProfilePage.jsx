import React, {useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import ProfilePageEdit from './ProfilePageEdit'

export default function ProfilePage() {

  const [details, setdetails] = useState("")

  useEffect(() => {
    const url = "http://localhost:8000/profile";
    const token = localStorage.getItem("token")

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }})

    .then((res) => res.json())
    .then((data) => setdetails(data))    
    
}, [])


  return (

    <div className="user-create">
      <div className="card">
        <h2>Min profil</h2>
        <img src={details.image} alt="profilbild" height="80px"/>
        <p>Användarnamn: {details.username}</p>
        <p>Namn: {details.fullname}</p>
        <p>E-post: {details.email}</p>
        </div>

        <br></br>
        <ProfilePageEdit />
        <Link to={"/feed"}> <button>Tillbaka</button></Link>
       
    </div>
  )
}
