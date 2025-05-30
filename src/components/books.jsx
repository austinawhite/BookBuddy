import {Routes, Route, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import Nav from './nav.jsx'; 

function Books() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([])
    const [search, setSearch] = useState([])
    const navigate = useNavigate();
  
  
    const getBooks = async () => {
      try {
        const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books");
        const data = await res.json();
        console.log("Data", data);
        setBooks(data);
        setFilteredBooks(data);
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
      
  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredBooks(filtered)
  }

    return (
      <>

      <Nav />
  
      <div className="Background">
  
        
        <div className="booksheader"> 
          <h1> Wake County Public Library </h1>
          <p> Browse our collection of books below. Click on the book to view additional details</p>
        </div> 

        <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={handleSearch}
            style={{ padding: '10px', width: '300px', marginTop: '20px' }}
          />
  
      <div className="books"> 
      {filteredBooks.map((books) => (
            <div key={books.id} className="books-card">
              <h2>{books.title}</h2>
              <p>By: {books.author}</p>
              <br></br>
              <img src={books.coverimage} alt={books.name} style={{ width: "100px" }} />
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