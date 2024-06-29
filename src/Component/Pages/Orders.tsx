import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { RootState } from '../../redux/rootReducer'
import { getOrders, getSearchOrder } from '../../redux/orders/actions'
import { ReduxData } from '../Types'

const Orders: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const location: any = useLocation()
    const [search, setSearch] = useState<string>('')
    const [clearDiv, setClearDiv] = useState<boolean>(false)
    const [currentItems, setCurrentItems] = useState<ReduxData[]>([])

    // const ordersAllData: any = useSelector(
    //     (state: RootState) => state.ordersReducer.ordersAllData
    // )
    const serachOrder: ReduxData[] = useSelector(
        (state: RootState) => state.ordersReducer.serachOrder
    )

    useEffect(() => {
        setCurrentItems(serachOrder)
    }, [dispatch, serachOrder])

    useEffect(() => {
        dispatch(getOrders())
        setClearDiv(true)
        dispatch(getSearchOrder(''))
    }, [dispatch])

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (search !== '' && e.key === 'Enter') {
            dispatch(getSearchOrder(search))
            setClearDiv(false)
        }
    }

    const clearSearch = () => {
        setSearch('')
        dispatch(getSearchOrder(''))
        setClearDiv(true)
    }

    return (
        <div id="page-container">
            <Header />
            <div id="content-wrap">
                <div className="small-container" id="content-wrap">
                    <div className="row row-3">
                        <h3>Orders Page</h3>
                        <input
                            className="search"
                            type="search"
                            placeholder="Search your orders here"
                            value={search}
                            onKeyPress={(e) => {
                                handleKeyPress(e)
                            }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <br />
                    </div>
                    <div className="row row-3">
                        <span>
                            {!clearDiv ? `Search Results on ${search}` : ``}
                        </span>
                        <span
                            className="cursor"
                            onClick={() => {
                                clearSearch()
                            }}
                            style={{ color: 'red' }}
                        >
                            {!clearDiv ? 'Clear' : ''}
                        </span>
                    </div>
                    {currentItems
                        .flat()
                        .reverse()
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .map((element: any) =>
                            element.cart.map((item: ReduxData) => {
                                return (
                                    <div
                                        className="row row-3 orders-Details"
                                        key={item.id}
                                    >
                                        <div
                                            className="row"
                                            onClick={() => {
                                                navigate(
                                                    `/order_details/${item.id}`,
                                                    { state: item.id }
                                                )
                                            }}
                                        >
                                            <span className="padding-10">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    height={'80px'}
                                                    width={'80px'}
                                                    loading="lazy"
                                                />
                                            </span>
                                        </div>
                                        <div>
                                            <span className="padding-5">
                                                <label
                                                    htmlFor={item.id.toString()}
                                                    className="cursor"
                                                >
                                                    <div className="ellipsis">
                                                        <strong>
                                                            {item.title}
                                                        </strong>
                                                    </div>
                                                    <div className="alignItem">
                                                        {item.brand}
                                                    </div>
                                                    <div className="alignItem">
                                                        {item.quantity}
                                                    </div>
                                                </label>
                                            </span>
                                        </div>
                                        <div>
                                            <strong>Price: {item.price}</strong>
                                        </div>
                                        <div>
                                            <div>
                                                <strong>
                                                    Delivery Details
                                                </strong>
                                            </div>
                                            <div>SHIP TO</div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Orders
