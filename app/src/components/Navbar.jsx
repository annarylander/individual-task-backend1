import React from 'react';
import {Link} from "react-router-dom"
import Logout from './Logout';

export default function Navbar() {
  return <div>

      <nav className='navbar'>
          <h1>Kodtjejer</h1>
          <div className='links'>
              <Link to='/'> Hem</Link>
              <Link to ='/profile'> Min profil</Link>
              <Link to ='/feed'> Alla inlägg</Link>
              <Logout></Logout>

          </div>

      </nav>
  </div>
}