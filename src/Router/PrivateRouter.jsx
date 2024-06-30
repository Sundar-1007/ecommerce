import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
    const { userData } = useSelector((state) => state.UserDetail);
    if (!userData) {
        return <Navigate to={'/login'}/>
    }
    return <Outlet/>
}

export default PrivateRouter