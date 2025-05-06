import {Routes, Route, Link} from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
 

function Details() {
    const { id } = useParams();
    const [books, setBooks] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
        const getBooks = async () => {
            try {
              const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
              const data = await res.json();
              console.log("Data", data);
              setBooks(data);
            }
            catch (error) {
              console.error("No books found", error)
            }
          };
  
      getBooks();
    }, [id]);
  
    if (!books) return <p>Loading book details...</p>;
  
    return (
      <div className="details">
        <h2>{books.title}</h2>
        <h2> By: {books.author} </h2>
        <img src={books.coverimage} alt={books.title} style={{ width: "250px" }} />
        <p>{books.description}</p>
        <p>{books.status}</p>
  
        <button onClick={() => navigate(-1)}>
          Return
        </button>

        <button>
            Checkout
        </button>
      </div>
    );
  }
  
  export default Details;