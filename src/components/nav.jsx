import {Routes, Route, Link} from 'react-router-dom'
import { useState,useEffect} from 'react'
import usericon from "../assets/usericon.png"
import { useNavigate } from 'react-router-dom'

function Nav () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)  
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('firstname')
    navigate('/')
    window.location.reload()
  }

    return (
      <>
        <div className="Nav">
        <div className="MainMenu"> 
            <Link to="/books"> All Books </Link>
            <Link to="/account"> My Account </Link>

        </div>
        <div className="user">
          {isLoggedIn && (
            <img src={usericon} alt="User Icon" className="UserIcon" />)}
          
          <div className="DropdownMenu">
            <button onClick={handleLogout}>Log out</button>
          </div>
          
        </div>
        </div>
      </>
    )
  }
  
  export default Nav