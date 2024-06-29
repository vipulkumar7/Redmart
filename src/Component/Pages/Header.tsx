import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import swal from 'sweetalert'
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
} from '@fortawesome/free-solid-svg-icons'
import { imagePath } from '../../utils/images'
import { RootState } from '../../redux/rootReducer'
import { AuthData, ReduxData } from '../Types'
import { signOut } from '../../redux/auth/actions'
import Dropdown from 'react-bootstrap/Dropdown'

const Header: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

    const auth: AuthData = useSelector((state: RootState) => state.authReducer)
    const cartData: ReduxData[] = useSelector(
        (state: RootState) => state.cartReducer1.cartData
    )

    const totalCount: number = cartData.reduce(
        (acc: number, curr: ReduxData) => acc + curr.quantity!,
        0
    )

    const handleSignOut = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault()
        swal('Are you sure you want to Log out?', {
            buttons: ['No', 'Yes'],
        }).then(function (isConfirm) {
            if (isConfirm) {
                swal({
                    title: 'Logout!',
                    text: 'Successfully Logout!',
                    icon: 'success',
                })
                dispatch(signOut())
                navigate('/login')
            }
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
                            onClick={() => {
                                navigate('/')
                            }}
                            loading="lazy"
                        />
                    </div>
                    <nav>
                        <ul id="MenuItems" className="nav-links">
                            {auth.token ? (
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
                            ) : (
                                ''
                            )}
                            {auth.token ? (
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
                            ) : (
                                ''
                            )}
                            {auth.token ? (
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
                                </li>
                            ) : (
                                ''
                            )}
                            {/* {auth.token ? (
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
                            ) : (
                                ''
                            )} */}
                            {auth.token ? (
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
                                            <FontAwesomeIcon icon={faUser} />{' '}
                                            <span className="authName">
                                                {auth.name}{' '}
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
                                                onClick={(e) => {
                                                    handleSignOut(e)
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSignOutAlt}
                                                />{' '}
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            ) : (
                                ''
                            )}
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
            </div>
        </>
    )
}

export default Header
