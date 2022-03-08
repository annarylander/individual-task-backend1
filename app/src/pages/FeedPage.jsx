import React from 'react'
import { Link } from 'react-router-dom'
import Feed from '../components/Feed'
import Logout from '../components/Logout'
import PostCreate from '../components/PostCreate'
import Profile from '../components/Profile'

export default function () {
  return (
    <div>
        <PostCreate />
        <Feed/>  
    </div>

  )
}
