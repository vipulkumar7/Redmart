/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
// import { ReduxData } from '../Types'
// import { RootState } from '../../redux/rootReducer'
import { getOrdersById } from '../../redux/orders/actions'

const OrderDetails: React.FC = () => {
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const location: any = useLocation()

    const { id } = useParams<{ id: any }>()

    // const orderWithId: ReduxData = useSelector(
    //     (state: RootState) => state.ordersReducer.orderWithId
    // )
    console.log(location.state, 'location')

    useEffect(() => {
        dispatch(getOrdersById(id))
    }, [])

    return (
        <div id="page-container">
            <Header />
            {/* <div id="content-wrap">
                <div className="small-container" id="content-wrap">
                    <div className="row row-3">
                        <h3>Orders Details</h3>
                    </div>
                </div>
                <div
                    className='row row-3 orders-Details'
                    key={item.id}
                >
                    <div
                        className='row'
                        onClick={() => { navigate(`/order_details/${item.id}`) }}
                    >
                        <span className='padding-10'>
                            <img
                                src={item.image}s
                                alt={item.title}
                                height={'80px'}
                                width={'80px'}
                                loading='lazy'
                            />
                        </span>
                        <span className='padding-5'>
                            <label
                                htmlFor={item.id.toString()}
                                className='cursor'
                            >
                                <div className='ellipsis'><strong>{item.title}</strong></div>
                                <div>{item.brand}</div>
                                <div>{item.quantity}</div>
                            </label>
                        </span>
                    </div>
                    <div><strong>Price: {item.price}</strong></div>
                    <div>
                        <div>
                            <strong>Delivery Details</strong>
                        </div>
                        <div>SHIP TO</div>
                    </div>
                </div> 
            </div>*/}
            <Footer />
        </div>
    )
}

export default OrderDetails
