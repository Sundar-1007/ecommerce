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
import PrivateRouter from './PrivateRouter'
import ErrorPage from '../Pages/404/ErrorPage'
import Test from '../Pages/Test/Test'

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<PrivateRouter />}>
                        <Route index element={<Cart />} />
                    </Route>
                    <Route path='/wishlist' element={<PrivateRouter />}>
                        <Route index element={<Wishlist />} />
                    </Route>
                    <Route path='/profile' element={<PrivateRouter />}>
                        <Route index element={<Profile />} />
                    </Route>
                    <Route path='/dashboard' element={<PrivateRouter />}>
                        <Route index element={<Dashboard />} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/productdetails/:productid' element={<ProductDetails />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path='*' element={<ErrorPage />} />
                    <Route path='/404' element={<ErrorPage />} />
                    <Route path='/test' element={<Test />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router