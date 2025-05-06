import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Nav from './components/nav.jsx'
import Register from './components/register.jsx'
import Details from './components/details.jsx'
import Logout from './components/logout.jsx'
import Books from './components/books.jsx'
import Account from './components/account.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/books" element={<Books/>} />
    <Route path="/details/:id" element={<Details />} />
    <Route path="/register" element={<Register/>}/>
    <Route path="/account" element={<Account/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
