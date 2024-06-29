/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'
import Header from './Header'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
// import FormModal from '../modals/FormModal'
import { IAddress } from '../Types'
import { RootState } from '../../redux/rootReducer'
import { deleteAddress, getAddress } from '../../redux/address/actions'
// import UpdateAddress from './UpdateAddress'

const Checkout: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const paymentData = location.state

    const addressData: IAddress[] = useSelector(
        (state: RootState) => state.addressReducer.addressData
    )
    const [_addModalShow, setAddModalShow] = useState<boolean>(false)
    const [_updateModalShow, setUpdateModalShow] = useState<boolean>(false)
    const [_editData, setEditData] = useState<IAddress>({
        name: '',
        mobile: '',
        fullAddress: '',
        pincode: '',
        city: '',
        state: '',
        id: 0,
    })
    const [cardSelect, setCardSelect] = useState<number>(
        addressData.length > 0 ? addressData[0].id : 0
    )

    useEffect(() => {
        dispatch(getAddress())
    }, [])

    // const addModalClose = () => {
    //     setAddModalShow(false)
    // }

    // const updateModalClose = () => {
    //     setUpdateModalShow(false)
    // }

    const handleDeleteAddress = (id: number) => {
        dispatch(deleteAddress(id))
        dispatch(getAddress())
    }

    const handleAddress = (e: any) => {
        setCardSelect(parseInt(e.target.value))
    }

    const handlePayment = () => {
        const filteredAddress = addressData.filter((item) => {
            if (item.id === cardSelect) return item
        })[0]
        navigate('/payment', { state: { paymentData, filteredAddress } })
    }

    const handleEditAddress = (item: IAddress) => {
        setEditData(item)
        setUpdateModalShow(true)
    }

    return (
        <div id="page-container">
            <Header />
            <div className="small-container cart-page" id="content-wrap">
                <div className="row row-2-address">
                    <h3>
                        {addressData.length !== 0
                            ? 'Select Address'
                            : 'Please add your address'}
                    </h3>
                    <ButtonToolbar>
                        <button
                            className="btn1"
                            onClick={() => {
                                setAddModalShow(true)
                            }}
                        >
                            Add Address
                        </button>
                        {/* <FormModal show={addModalShow} onHide={addModalClose} /> */}
                    </ButtonToolbar>
                </div>
                <div>
                    {addressData.map((item, index) => (
                        <div
                            key={item.id}
                            onChange={(e) => {
                                handleAddress(e)
                            }}
                            className={
                                cardSelect === item.id
                                    ? 'card-border radio-btn'
                                    : 'radio-btn'
                            }
                        >
                            <div>
                                <input
                                    type="radio"
                                    id={item.id.toString()}
                                    name="address"
                                    value={item.id}
                                    defaultChecked={index === 0}
                                    className="margin20"
                                />
                            </div>
                            <label
                                htmlFor={item.id.toString()}
                                className="cursor"
                            >
                                <div>
                                    <div>
                                        <div>
                                            <span>
                                                <strong>
                                                    {item.name} &nbsp;{' '}
                                                    {item.mobile}
                                                </strong>
                                            </span>
                                            <span
                                                className="btn-remove cursor"
                                                onClick={() => {
                                                    handleDeleteAddress(item.id)
                                                }}
                                            >
                                                &nbsp; &nbsp;
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                />
                                            </span>
                                            <span
                                                className="btn-remove cursor"
                                                onClick={() => {
                                                    handleEditAddress(item)
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />
                                            </span>
                                            {/* <UpdateAddress
                                                show={updateModalShow}
                                                onHide={updateModalClose}
                                                editdata={editData}
                                            /> */}
                                        </div>
                                        <div>
                                            {item.fullAddress} , {item.city}
                                        </div>
                                        <div>
                                            {item.state} -{' '}
                                            <strong>{item.pincode}</strong>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </label>
                        </div>
                    ))}
                </div>
                <button
                    className="btn1"
                    onClick={() => {
                        handlePayment()
                    }}
                    disabled={addressData.length === 0 ? true : false}
                >
                    Go to Payment
                </button>
            </div>
            <Footer />
        </div>
    )
}

export default Checkout
