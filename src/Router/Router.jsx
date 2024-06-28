import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import { Navbar } from '../components/Navbar/Navbar'
import Cart from '../Pages/Cart/Cart'
import Wishlist from '../Pages/Wishlist/Wishlist'
import Profile from '../Pages/Profile/Profile'
import Categories from '../Pages/Categories/Categories'
import Dashboard from '../Pages/Dashboard/Dashboard'
import ProductDetails from '../Pages/ProductDetails/ProductDetails'
import Login from '../Pages/Login/Login'

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/wishlist' element={<Wishlist />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/productdetails/:productid' element={<ProductDetails/>}/>
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router