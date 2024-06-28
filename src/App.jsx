import React, { useEffect } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import Router from './Router/Router'
import { useDispatch } from 'react-redux'
import { getProducts } from './Slices/ProductSlice'
import { getAllUserData } from './Slices/UserDetailSlice'

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProducts())
    dispatch(getAllUserData())
  },[])
  return (
    <>
      <Router/>
    </>
  )
}

export default App