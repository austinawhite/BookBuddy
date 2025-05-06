import {Routes, Route, Link} from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from './nav';
 

function Details() {
    const { id } = useParams();
    const [books, setBooks] = useState(null);
    const [message, setMessage] = useState("")
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
  

    const handleCheckout = async () => {
      const token = localStorage.getItem("token")
        if (!token){
          alert("You must log in to checkout a book")
          return
        }

        try {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                bookId: id
              })
            })
      
            const result = await response.json()
      
            if (response.ok) {
              setMessage("Reservation confirmed! Your book will be ready for pickup at the front desk.")
            } else {
              setMessage(result.message || "Checkout failed. Please contact the library support team for questions.")
            }
          } catch (error) {
            console.error("Checkout error:", error)
            setMessage("An error occurred. Please try again.")
          }
        }

        if (!books) return <p>Loading book details...</p>;
  
    return (
      <>
      <Nav />
      <div className="details">
        <h2>{books.title}</h2>
        <h2> By: {books.author} </h2>
        <img src={books.coverimage} alt={books.title} style={{ width: "250px" }} />
        <p>{books.description}</p>
        <p>{books.status}</p>
  
        <button onClick={() => navigate(-1)}>
          Return
        </button>

        <button onClick={handleCheckout}>
            Checkout
            {message && <p>{message}</p>}
        </button>
      </div>
      </>
    )
  }
  
  export default Details;