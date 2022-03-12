import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">
          {" "}
          <h1>Kodtjejer</h1>
        </Link>
        <div className="links">
          <Link to="/profile"> Min profil</Link>
          <Link to="/blog"> Alla inlägg</Link>
          <Link to="/users"> Användare</Link>
          <Logout></Logout>
        </div>
      </nav>
    </div>
  );
}
