import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import SignIn from './pages/SignIn.jsx'
import Register from './pages/Register.jsx'
import Products from './pages/Products.jsx'
import Cart from './pages/Cart.jsx'
import ProductsDetails from './pages/ProductsDetails.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainLayout><Home /></MainLayout>} />
        <Route path='/about' element={<MainLayout><About /></MainLayout>} />
        <Route path='/cart' element={<MainLayout><Cart /></MainLayout>} />
        <Route path='/products' element={<MainLayout><Products /></MainLayout>} />
        <Route path='/products/:id' element={<MainLayout><ProductsDetails /></MainLayout>} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<MainLayout><ErrorPage /></MainLayout>} />
      </Routes>
    </div>
  )
}

export default App