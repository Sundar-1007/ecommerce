import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../../Slices/UserDetailSlice';

export const Navbar = () => {
    const { userData } = useSelector(state => state.UserDetail);
    const dispatch = useDispatch()

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/">
                            Logo
                        </Link>
                        <form className="d-flex" role="search">
                            <div className="input-group">
                                <input type="search" className="form-control shadow-none" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button className="btn btn-outline-success" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </form>
                        <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
                            <li className="nav-item dropdown d-flex align-items-center">
                                <Link className="dropdown-toggle nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                                    {userData ?
                                        <>
                                            <i className="bi bi-person me-2"></i>
                                            <span>{userData.userName}</span>
                                        </> :
                                        <>
                                            <i className="bi bi-box-arrow-in-right me-2"></i>
                                            <span>Login/signUp</span>
                                        </>}
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item disabled" disabled>{userData ? userData.userName : 'Login'}</Link></li>
                                    {!userData && <li><Link className="dropdown-item" to={'/login'}><i className="bi bi-box-arrow-in-right me-2"></i>Login</Link></li>}
                                    {userData && <li><Link className="dropdown-item" to="/Profile"><i className="bi bi-person me-2"></i>Profile</Link></li>}
                                    {userData?.isAdmin && <li><Link className="dropdown-item" to="/DashBoard"><i className="bi bi-clipboard-pulse me-2"></i>DashBoard</Link></li>}
                                    {userData && <li><Link className="dropdown-item" onClick={() => dispatch(logOut())}><i className="bi bi-box-arrow-left me-2"></i>Logout</Link></li>}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <i className="bi bi-cart2 me-2"></i>Cart
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/wishlist'>
                                    <i className="bi bi-heart me-2"></i>wishList
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
