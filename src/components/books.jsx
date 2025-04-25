import {Routes, Route, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';

function Books() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
  
  
    const getBooks = async () => {
      try {
        const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books");
        const data = await res.json();
        console.log("Data", data);
        setBooks(data);
      }
      catch (error) {
        console.error("No books found", error)
      }
    };
  
    useEffect(() => {
      getBooks();
    }, []);

    useEffect(() => {
        console.log("Books loaded:", books);
      }, [books]);
      
  
    return (
      <>
  
      <div className="Background">
  
        
        <div className="banner"> 
          <h1> Wake County Public Library </h1>
        </div> 
  
      <div className="teams"> 
      {books.map((books) => (
            <div key={books.id} className="books-card">
              <h4>{books.title}</h4>
              <img src={books.coverimage} alt={books.name} style={{ width: "300px" }} />
              <br></br>
              <button onClick={() => navigate(`/details/${books.id}`)}>View Details</button>
            </div>
          ))}
  
      </div>
      </div>
  
      </>
    )
  }
  
  export default Books