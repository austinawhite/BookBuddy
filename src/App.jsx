import {Routes, Route, Link,} from 'react-router-dom'
import './App.css'
import Register from './components/register';
import login from './assets/login.jpg';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  console.log('see if this is working');

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(event) {
    event.preventDefault()
    try {
      const response = await fetch ("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const result = await response.json()
      console.log("Login result:", result)

      if (response.ok && result.token) {
        localStorage.setItem("token", result.token)
        navigate("/books")
      } else {
        alert("Unable to login. Please contact library support for help.")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("An error occurred. Please try again.")
    }
  }



  return (
    <>
    <div className="LoginMain">
      

      <div className="LoginImage">
      <img src={login} alt="loginimage"/>
      </div>

      <div className="LoginForm">
        <h1> Wake County Public Library </h1>
        <form onSubmit={handleLogin}>
          <label> Email 
          <input  name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
          </label> 
          <br></br>
          <label> Password <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
          </label> 
          <br></br>
          <button type="submit"> Login </button> <br></br>
        </form>
    
          <Link to="/register"> Create Account</Link>
          <br></br>
          <Link to="/books">Browse books without logging in</Link> 
        

      </div>
    
    </div>
      
    </>
  )
}

export default App
