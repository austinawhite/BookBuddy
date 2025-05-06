import { useEffect, useState } from 'react'
import Nav from './nav'

function Account() {
  const [userInfo, setUserInfo] = useState(null)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) return

    const fetchData = async () => {
      try {
        
        const userRes = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const userData = await userRes.json()
        if (userRes.ok) {
          setUserInfo(userData)
        } else {
          console.error('Failed to fetch user info:', userData.message)
        }

        
        const booksRes = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const booksData = await booksRes.json()
        if (booksRes.ok) {
          setBooks(booksData) // direct array of reservations
        } else {
          console.error('Failed to fetch reserved books:', booksData.message)
        }
      } catch (err) {
        console.error('Error fetching account data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token])

  const handleReturn = async (reservationId) => {
    try {
      const res = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (res.status === 204) {
        setBooks(prev => prev.filter(book => book.id !== reservationId))
      } else if (res.status === 403) {
        alert("You are not authorized to return this book.")
      } else if (res.status === 404) {
        alert("Reservation not found.")
      } else {
        alert("Failed to return the book.")
      }
    } catch (error) {
      console.error("Error returning book:", error)
      alert("An unexpected error occurred.")
    }
  }

  if (!token) return <p>Please log in to view your account.</p>
  if (loading) return <p>Loading account data...</p>

  return (
    <>
    <Nav />
    <div className="AccountPage" style={{ padding: '20px' }}>
      <div>
      <h2>My Account</h2>

      {userInfo ? (
        <div className="UserInfo" style={{ marginBottom: '20px' }}>
          <p><strong>First Name:</strong> {userInfo.firstname}</p>
          <p><strong>Last Name:</strong> {userInfo.lastname}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
      ) : (
        <p>Unable to load user information.</p>
      )}
    </div>
    <div>
      <h3>My Books</h3>
      {books.length === 0 ? (
        <p>Browse available books for checkout.</p>
      ) : (
        <ul className="CheckedOutBooks">
          {books.map((book) => (
            <ul key={book.id} style={{ marginBottom: '20px' }}>
              <strong>{book.title}</strong> by {book.author}
              <div>
                <img
                  src={book.coverimage}
                  alt={book.title}
                  style={{ width: '100px', marginTop: '8px' }}
                />
              </div>
              <p style={{ maxWidth: '400px' }}>{book.description}</p>
              <button onClick={() => handleReturn(book.id)} style={{ marginTop: '8px' }}>
                Return Book
              </button>
            </ul>
          ))}
        </ul>
      )}
      </div>
    </div>
    </>
  )
}

export default Account
