import React, { createContext, useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx'
import ProductsDetails from './pages/ProductsDetails.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

export const CountCart = createContext(null)

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <CountCart.Provider value={{ count, setCount }}>
        <Routes>
          <Route path='/' element={<MainLayout><Home /></MainLayout>} />
          <Route path='/about' element={<MainLayout><About /></MainLayout>} />
          <Route path='/cart' element={<MainLayout><Cart /></MainLayout>} />
          <Route path='/products' element={<MainLayout><Products /></MainLayout>} />
          <Route path='/products/:id' element={<MainLayout><ProductsDetails /></MainLayout>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </CountCart.Provider>
    </div>
  )
}

export default App