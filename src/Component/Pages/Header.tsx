import React, { useState, useEffect } from 'react'
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
import { deleteCookie, getCookie } from '../../commonFunction'

const Header: React.FC = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { userLoggedIn, currentUser } = useAuth()!;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
    const cartData: ReduxData[] = useSelector(
        (state: RootState) => state.cartReducer1.cartData
    )

    const totalCount: number = cartData.reduce(
        (acc: number, curr: ReduxData) => acc + curr.quantity!,
        0
    )

    const myCookieValue = getCookie("authToken");
    const userName = getCookie("fullName");

    useEffect(() => {
        myCookieValue && setIsLoggedin(true);
    }, [myCookieValue]);


    const handleLogout = async () => {
        setIsLoggedin(false);
        deleteCookie("authToken");
        deleteCookie("userId");
        deleteCookie("fullName");
        navigate("/login");
    };

    const handleSocialLogout = async () => {
        doSignOut().then(() => {
            setIsLoggedin(false);
            deleteCookie("authToken");
            deleteCookie("userId");
            deleteCookie("fullName");
            navigate("/login");
        })
    }

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
                            height='36px'
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
                                    <span className='text-color-header'>
                                        <FontAwesomeIcon icon={faHome} /> Home
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/products"
                                    className={(navData) =>
                                        navData.isActive ? 'navHeader' : ''
                                    }
                                >
                                    <span className='text-color-header'>
                                        <FontAwesomeIcon icon={faStore} />{' '}
                                        Products
                                    </span>
                                </NavLink>
                            </li>
                            {isLoggedin || userLoggedIn ?
                                <li>
                                    <NavLink
                                        to="/cart"
                                        className={(navData) =>
                                            navData.isActive ? 'navHeader' : ''
                                        }
                                    >
                                        <span className='text-color-header'>
                                            <FontAwesomeIcon icon={faCartPlus} />{' '}
                                            Cart
                                        </span>

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
                                    <span className='text-color-header'>
                                        <FontAwesomeIcon icon={faAddressCard} />{' '}
                                        About
                                    </span>
                                </NavLink>
                            </li>
                            {isLoggedin || userLoggedIn ? (
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
                                            <span>{userLoggedIn &&
                                                <img style={{
                                                    borderRadius: "50%"
                                                }} src={currentUser?.photoURL} width={'30px'} height={'30px'} />
                                            }
                                            </span>
                                            <span className="authName">
                                                {' '}{userLoggedIn ? currentUser?.displayName : userName}{' '}
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
                                                // href="/login"
                                                // onClick={() => {
                                                //     isLoggedin ? handleLogout() :
                                                //         handleSocialLogout();
                                                // }}
                                                onClick={async (e) => {
                                                    e.preventDefault(); // Prevent default href action
                                                    try {
                                                        if (isLoggedin) {
                                                            await handleLogout(); // Wait for logout to complete
                                                        } else {
                                                            await handleSocialLogout(); // Wait for social logout to complete
                                                        }
                                                    } catch (error) {
                                                        console.error('Error during logout:', error);
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSignOutAlt}
                                                />{' '}
                                                {isLoggedin || userLoggedIn ? 'Logout' : "Login"}
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            ) : <li><NavLink to="/login" className={(navData) =>
                                navData.isActive ? 'navHeader' : ''
                            }>
                                <span className='text-color-header'>
                                    <FontAwesomeIcon icon={faSignInAlt} />
                                    {' '}
                                    Login
                                </span>
                            </NavLink></li>}
                        </ul>
                    </nav>
                    {pathname !== '/login' &&
                        pathname !== '/signup' && (
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
