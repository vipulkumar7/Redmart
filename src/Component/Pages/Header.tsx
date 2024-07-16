import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAddressCard,
    faCaretDown,
    faCaretUp,
    faCartPlus,
    faHome,
    faShoppingBasket,
    faSignOutAlt,
    faStore,
    faUser,
    faSignInAlt
} from '@fortawesome/free-solid-svg-icons'
import { imagePath } from '../../utils/images'
import { RootState } from '../../redux/rootReducer'
import { ReduxData } from '../Types'
import Dropdown from 'react-bootstrap/Dropdown'
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";

const Header: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { userLoggedIn, currentUser } = useAuth()!;

    console.log(useAuth())

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
    const cartData: ReduxData[] = useSelector(
        (state: RootState) => state.cartReducer1.cartData
    )

    const totalCount: number = cartData.reduce(
        (acc: number, curr: ReduxData) => acc + curr.quantity!,
        0
    )

    const handleMenu = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault()
        const menuIcon = document.getElementsByClassName(
            'menu-icon'
        ) as HTMLCollectionOf<Element>
        const navLinks = document.getElementsByClassName(
            'nav-links'
        ) as HTMLCollectionOf<Element>
        menuIcon[0].addEventListener('click', () => {
            navLinks[0].classList.toggle('mobile-menu')
        })
    }

    return (
        <>
            <div className="container">
                <div className="navbar">
                    <div className="logo cursor">
                        <img
                            src={imagePath.logo}
                            alt="logo"
                            width="125px"
                            onClick={() => {
                                navigate('/')
                            }}
                            loading="lazy"
                        />
                    </div>
                    <nav>
                        <ul id="MenuItems" className="nav-links">
                            <li>
                                <NavLink
                                    to="/"
                                    className={(navData) =>
                                        navData.isActive ? 'navHeader' : ''
                                    }
                                >
                                    <FontAwesomeIcon icon={faHome} /> Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/products"
                                    className={(navData) =>
                                        navData.isActive ? 'navHeader' : ''
                                    }
                                >
                                    <FontAwesomeIcon icon={faStore} />{' '}
                                    Products
                                </NavLink>
                            </li>
                            {userLoggedIn ?
                                <li>
                                    <NavLink
                                        to="/cart"
                                        className={(navData) =>
                                            navData.isActive ? 'navHeader' : ''
                                        }
                                    >
                                        <FontAwesomeIcon icon={faCartPlus} />{' '}
                                        Cart

                                        <span className="header-cart-value">
                                            {' '}
                                            {totalCount ? totalCount : ''}
                                        </span>
                                    </NavLink>
                                </li> : ''}
                            <li>
                                <NavLink
                                    to="/about"
                                    className={(navData) =>
                                        navData.isActive ? 'navHeader' : ''
                                    }
                                >
                                    <FontAwesomeIcon icon={faAddressCard} />{' '}
                                    About
                                </NavLink>
                            </li>
                            {userLoggedIn ? (
                                <li>
                                    <Dropdown
                                        onMouseOver={() => {
                                            setDropdownOpen(true)
                                        }}
                                        onMouseLeave={() => {
                                            setDropdownOpen(false)
                                        }}
                                        show={dropdownOpen}
                                    >
                                        <Dropdown.Toggle className="user-dropdown-margin">
                                            {/* <FontAwesomeIcon icon={faUser} />{' '} */}
                                            <span>
                                                <img style={{
                                                    borderRadius: "50%"
                                                }} src={currentUser?.photoURL} width={'30px'} height={'30px'} />
                                            </span>
                                            <span className="authName">
                                                {' '}{currentUser?.displayName}{' '}
                                            </span>
                                            <FontAwesomeIcon
                                                icon={
                                                    dropdownOpen
                                                        ? faCaretUp
                                                        : faCaretDown
                                                }
                                            />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/profile">
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                />{' '}
                                                Profile
                                            </Dropdown.Item>
                                            <Dropdown.Item href="/orders">
                                                <FontAwesomeIcon
                                                    icon={faShoppingBasket}
                                                />{' '}
                                                Orders
                                            </Dropdown.Item>
                                            <Dropdown.Item href="/address">
                                                <FontAwesomeIcon
                                                    icon={faAddressCard}
                                                />{' '}
                                                Address
                                            </Dropdown.Item>
                                            <Dropdown.Item href="/about">
                                                <FontAwesomeIcon
                                                    icon={faAddressCard}
                                                />{' '}
                                                About
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                href="/login"
                                                onClick={() => {
                                                    doSignOut().then(() => {
                                                        navigate("/login");
                                                    });
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSignOutAlt}
                                                />{' '}
                                                {userLoggedIn ? 'Logout' : "Login"}
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            ) : <li><NavLink to="/login" className={(navData) =>
                                navData.isActive ? 'navHeader' : ''
                            }>
                                <FontAwesomeIcon icon={faSignInAlt} />
                                {' '}
                                Login
                            </NavLink></li>}
                        </ul>
                    </nav>
                    {/* <span>
                        <FontAwesomeIcon icon={faShoppingBag} />
                    </span> */}
                    {location.pathname !== '/login' &&
                        location.pathname !== '/signup' && (
                            <img
                                src={imagePath.menu}
                                alt="menu"
                                className="menu-icon"
                                loading="lazy"
                                onClick={(e) => {
                                    handleMenu(e)
                                }}
                            />
                        )}
                </div>
            </div >
        </>
    )
}

export default Header
