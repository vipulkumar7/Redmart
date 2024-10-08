/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { useDocumentTitle } from '../setDocumentTitle'
import {
    faMinusCircle,
    faPlusCircle,
    faRupeeSign,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { RootState } from '../../redux/rootReducer'
import { AxiosHeaders, ReduxData } from '../Types'
import {
    cartIncrement,
    getCart,
    cartDecrement,
    deleteCart,
} from '../../redux/cart/actions'
import { useAuth } from "../../contexts/authContext";
import { getCookie } from '../../commonFunction'

const Cart: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()!;

    const cartData: ReduxData[] = useSelector(
        (state: RootState) => state.cartReducer.cartData
    )

    const SubTotal: number = cartData.reduce(
        (acc: number, curr: ReduxData) => acc + curr.price * curr.quantity!,
        0
    )
    const tax: number = SubTotal * 0.05
    const total: number = SubTotal * 1.05

    const userId = getCookie("userId");

    const headers: AxiosHeaders = {
        'Authorization': getCookie('authToken'),
        'userId': userId,
    }

    useDocumentTitle('Cart')
    useEffect(() => {
        dispatch(getCart(headers))
    }, [])

    const onClickRemoveFromCart = (cart: ReduxData) => {
        swal('Are you sure you want to remove this item?', {
            buttons: ['Cancel', 'Remove'],
        }).then(function (isConfirm) {
            if (isConfirm) {
                swal({
                    title: 'Remove Item',
                    text: `Successfully removed ${cart.title} from your cart`,
                    icon: 'success',
                })
                dispatch(deleteCart(cart._id, headers))
            }
        })
    }

    const handleAddQuantity = (id: string) => {
        dispatch(cartIncrement(id, headers))
    }

    const handleSubQuantity = (id: string) => {
        dispatch(cartDecrement(id, headers))
    }

    const onClickProductDetails = (productID: number) => {
        navigate(`/product/${productID}`)
    }

    const handlePlaceOrder = () => {
        !userLoggedIn || !userLoggedIn && swal({
            title: 'Please login before goto payment page.',
            // icon: 'success',
        })
        userLoggedIn || userId ? navigate('/checkout', { state: { cartData, total } }) : navigate('/login')
    }

    return (
        <div id="page-container">
            <Header />
            {userId && cartData?.length !== 0 && cartData ? (
                <div className="small-container cart-page" id="content-wrap">
                    <table className="table1">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartData?.map((cart) => (
                                <tr key={cart._id}>
                                    <td>
                                        <div className="cart-info">
                                            <img
                                                src={cart.image}
                                                alt="buy-1"
                                                loading="lazy"
                                            />
                                            <div>
                                                <div
                                                    className="cursor"
                                                    onClick={() => {
                                                        onClickProductDetails(
                                                            cart._id
                                                        )
                                                    }}
                                                >
                                                    <h3 className="brandName">
                                                        {cart.brand}
                                                    </h3>
                                                    <p className="ellipsis">
                                                        {cart.title}
                                                    </p>
                                                    <small>
                                                        Price:{' '}
                                                        <FontAwesomeIcon
                                                            icon={faRupeeSign}
                                                        />{' '}
                                                        {cart.price}
                                                    </small>
                                                    <small className="sizein-cart">
                                                        {' '}
                                                        Size: {cart.size}
                                                    </small>
                                                    <br />
                                                </div>
                                                {/* <span
                                                    className="btn-remove cursor"
                                                    onClick={() => {
                                                        onClickRemoveFromCart(
                                                            cart
                                                        )
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrashAlt}
                                                    />
                                                </span> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            className="btn-remove cursor"
                                            onClick={() => {
                                                onClickRemoveFromCart(cart)
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashAlt}
                                            />
                                        </span>
                                        <span
                                            className={
                                                cart.quantity! > 1
                                                    ? 'cart-btn cursor'
                                                    : 'cart-btn cursor disable-decrement-cart'
                                            }
                                            onClick={() => {
                                                handleSubQuantity(cart._id as any)
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faMinusCircle}
                                            />
                                        </span>
                                        <span>{cart.quantity} </span>
                                        <span
                                            className={
                                                cart.quantity! < 10
                                                    ? 'cart-btn cursor'
                                                    : 'cart-btn cursor disable-decrement-cart'
                                            }
                                            onClick={() => {
                                                handleAddQuantity(cart._id as any)
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlusCircle}
                                            />
                                        </span>
                                    </td>
                                    <td>
                                        <FontAwesomeIcon icon={faRupeeSign} />{' '}
                                        {(
                                            Math.round(
                                                cart.quantity! *
                                                cart.price *
                                                100
                                            ) / 100
                                        ).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="total-price">
                            <tr>
                                <td />
                                <td>Subtotal</td>
                                <td>
                                    <FontAwesomeIcon icon={faRupeeSign} />{' '}
                                    {(Math.round(SubTotal * 100) / 100).toFixed(
                                        2
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td />
                                <td>Tax</td>
                                <td>
                                    <FontAwesomeIcon icon={faRupeeSign} />{' '}
                                    {(Math.round(tax * 100) / 100).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td />
                                <td>Total</td>
                                <td>
                                    <FontAwesomeIcon icon={faRupeeSign} />{' '}
                                    {(Math.round(total * 100) / 100).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td />
                                <td />
                                <td>
                                    <button
                                        className="btn1"
                                        onClick={() => {
                                            handlePlaceOrder()
                                        }}
                                    >
                                        Place Order
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <div>
                    <h1 className="empty-cart"> Your cart is empty!</h1>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default Cart
