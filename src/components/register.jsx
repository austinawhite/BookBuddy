import {Routes, Route, Link} from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Register() {

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname]= useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(event){
    event.preventDefault();
    try {
      console.log("hi")
      const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",{
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname, 
          email: email, 
          password: password
        })
        })
      const result = await response.json()
      console.log(result); 

      if(result.success){
        navigate("/books");
      } else {
        alert ("We were unable to register your account. Please contact library support for additional help")
      }

    }catch(error){
      console.log(error)
    }
  }


    return (
      <>
      <div className="container mt-5">
      <h1> Register </h1>
      <p> Create a library account to check out books </p>
      </div>
      <div className="mx-auto">
      <form className="mb-3" onSubmit={handleSubmit}>
      <label className="form-label"> 
        First Name: 
        <input name="firstname" type="text" onChange={(event)=> setFirstname(event.target.value)}
        value={firstname}/>
        </label>

        <br></br>

      <label className="form-label">
          Last Name:
          <input name="lastname" type="text" onChange={(event)=> setLastname(event.target.value)}
          value={lastname}/>
      </label>

      <br></br>

      <label className="form-label">
        Email Address:
        <input name="email" type="email" onChange={(event)=> setEmail(event.target.value)}
        value={email}/>
      </label>

      <br></br>

      <label className="form-label">
        Password:
        <input name="password" type="password" onChange={(event)=> setPassword(event.target.value)}
        value={password}/>
      </label>

      <br></br>

      <button type="submit">Submit</button>
      </form>
      </div>
      </>
    )
  }
  
  export default Register