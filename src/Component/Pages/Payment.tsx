/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../axiosInstance'
import swal from 'sweetalert'
import Header from './Header'
import Footer from './Footer'
import Form from 'react-bootstrap/Form'
import { RootState } from '../../redux/rootReducer'
import { deleteAllCart } from '../../redux/cart/actions'
import { ReduxData } from '../Types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons'

const Payment: React.FC = () => {
    const dispatch = useDispatch()

    const cartData: ReduxData[] = useSelector(
        (state: RootState) => state.cartReducer1.cartData
    )

    // const address = location.state.filteredAddress!
    // const cart = location.state.paymentData

    // const total = (Math.round(cart.total * 100) / 100).toFixed(2)
    const [, setSuccess] = useState<boolean>(false)
    const stripe: any = useStripe()
    const elements: any = useElements()

    const CARD_OPTIONS: any = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#03BFB9',
                color: 'black',
                fontWeight: 500,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': { color: '#03BFB9' },
                '::placeholder': { color: '#03BFB9' },
            },
            invalid: {
                iconColor: 'red',
                color: 'red',
            },
        },
    }

    const cartIds: number[] = []
    cartData.forEach((item: ReduxData) => {
        if (item.id) {
            cartIds.push(item.id)
        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })
        if (!error) {
            // const { id } = paymentMethod;
            const paymentDetails = {
                // amount: parseInt(total) * 100,
                // id
            }
            axiosInstance
                .post('http://localhost:4000/payment', paymentDetails)
                .then((response) => {
                    if (response.data.success) {
                        swal({
                            title: 'Payment Successful!',
                            icon: 'success',
                        })
                        // dispatch(postOrders(cart.cartData, address))
                        dispatch(deleteAllCart(cartIds))
                        // navigate('/orders', { state: { cartData, address } })
                        setSuccess(true)
                    }
                })
                .catch((err) => {
                    console.log('Error', err)
                })
        } else {
            console.log(error.message)
        }
    }

    return (
        <div id="page-container">
            <Header />
            <div id="content-wrap">
                <div
                    className="small-container"
                    id="content-wrap"
                    // style={{ paddingLeft: '250px', paddingRight: '250px' }}
                >
                    <Form
                        onSubmit={(e) => {
                            handleSubmit(e)
                        }}
                    >
                        <div>
                            <p>
                                Amount: <FontAwesomeIcon icon={faRupeeSign} />{' '}
                                {/* {parseInt(total)} */}
                            </p>
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                        <button className="btn1">Pay</button>
                    </Form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Payment
