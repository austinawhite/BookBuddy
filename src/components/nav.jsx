import {Routes, Route, Link} from 'react-router-dom'

function Nav () {

    return (
      <>
        <div className="MainMenu"> 
            <Link to="/books"> All Books </Link>
            <Link to="/account"> My Account </Link>

        </div>
        <div className="Search"> </div>
      </>
    )
  }
  
  export default Nav