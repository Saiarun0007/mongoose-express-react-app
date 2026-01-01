// App.jsx
import { useState } from 'react'
import './App.css' // Uncommented this to apply styles
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import Home from '../components/Home'
import UserPage from '../components/userPage'
import UserForm from '../components/UserForm'
import ProductDetails from '../components/ProductDetails'
import EditProduct from '../components/editProduct'

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        {/* Modern Navigation Header */}
        <nav className="navbar">
          <h1 className="nav-logo">My App</h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to='/newproduct' className="nav-link">New Product</Link>
          </div>
        </nav>

        {/* Dynamic Content Container */}
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<UserPage />} />
            <Route path='/newproduct' element={<UserForm />} />

            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path='/products/:id/edit' element={<EditProduct />} />

            {/* 404 Route */}
            <Route path='*' element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>404</h2>
                <p>Page Not Found</p>
              </div>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App