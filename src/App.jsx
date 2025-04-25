import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import './App.css'
import loginbackground from './assets/loginbackground.svg';

function App() {

  console.log('see if this is working');


  return (
    <>
    <div className="LoginMain">
      

      <div className="LoginImage">
      <img src={loginbackground} alt="libraryimage"/>
      </div>

      <div className="LoginForm">
        <h1> Wake County Public Library </h1>
        <form>
          <label> Username <input name="username"></input></label> <br></br>
          <label> Password <input name="password"></input></label> <br></br>
          <button> Login </button> <br></br>
          <p> Create Account </p>
          <Link to="/books">Browse books without logging in</Link> 
        </form>

      </div>
    
    </div>
      
    </>
  )
}

export default App
