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
          setBooks(booksData) // response is an array
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

  if (!token) return <p>Please log in to view your account.</p>
  if (loading) return <p>Loading account data...</p>

  return (

    <>
    <Nav />
    <div className="AccountPage" style={{ padding: '20px' }}>
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

      <h3>Checked-Out Books</h3>
      {books.length === 0 ? (
        <p>You haven’t checked out any books yet.</p>
      ) : (
        <ul className="CheckedOutBooks">
          {books.map((book) => (
            <li key={book.id} style={{ marginBottom: '12px' }}>
              <strong>{book.title}</strong> by {book.author}
              <div>
                <img 
                  src={book.coverimage} 
                  alt={book.title} 
                  style={{ width: '100px', marginTop: '8px' }} 
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  )
}

export default Account
