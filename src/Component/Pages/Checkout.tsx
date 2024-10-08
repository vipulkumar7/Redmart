/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { loadStripe } from '@stripe/stripe-js';
import Footer from './Footer'
import Header from './Header'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { AddressProps, ReduxData } from '../Types'
import { RootState } from '../../redux/rootReducer'
import { deleteAddress, getAddress } from '../../redux/address/actions'
import { getCookie } from '../../commonFunction'
import AddAddressModal from '../modals/AddAddressModal'
import EditAddressModal from '../modals/EditAddressModal'
import axiosInstance from '../../axiosInstance'
import API_ENDPOINTS from '../../config/apiconfig'
import { getCart } from '../../redux/cart/actions';
// import UpdateAddress from './UpdateAddress'

const Checkout: React.FC = () => {
    const dispatch = useDispatch()

    const cartData: ReduxData[] = useSelector(
        (state: RootState) => state.cartReducer.cartData
    )

    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const addressData: AddressProps[] = useSelector(
        (state: RootState) => state.addressReducer.addressData
    )
    const handleEditShow = () => setShowEditModal(true);
    const handleAddShow = () => setShowAddModal(true);

    const handleAddClose = () => setShowAddModal(false);
    const handleEditClose = () => setShowEditModal(false);

    const handleSave = (updatedAddress: AddressProps) => {
        console.log('Updated Address:', updatedAddress);
    };

    const userId: any = getCookie("userId")
    const headers: any = {
        'Authorization': getCookie('authToken'),
        "userId": userId
    }

    useEffect(() => {
        userId && dispatch(getCart(headers))
        dispatch(getAddress(headers))
    }, [])

    const handleDeleteAddress = (id: string | undefined) => {
        dispatch(deleteAddress(id as any, headers));
    }

    const handlePayment = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
        const body = {
            products: cartData
        }
        await axiosInstance
            ?.post(`${API_ENDPOINTS.createCheckoutsession}`, JSON.stringify(body), { headers })
            .then((res) => {
                return stripe?.redirectToCheckout({
                    sessionId: res.data.id
                })
            })
            .catch((error) => {
                console.error('An error occurred:', error);
                alert('An error occurred. Please try again later.');
            });
    }

    return (
        <div id="page-container">
            <Header />
            <div className="small-container cart-page" id="content-wrap">
                <div className="row row-2-address">
                    <h3>
                        {addressData?.length !== 0
                            ? 'Select Address'
                            : 'Please add your address'}
                    </h3>
                    <ButtonToolbar>
                        <button
                            className="btn1"
                            onClick={handleAddShow}
                        >
                            Add Address
                        </button>
                    </ButtonToolbar>
                    <AddAddressModal show={showAddModal} handleAddClose={handleAddClose} />
                </div>
                <div>
                    {addressData?.map((item, index) => (
                        <div key={item._id}>
                            <div>
                                <input
                                    type="radio"
                                    id={item._id}
                                    name="address"
                                    value={item._id}
                                    defaultChecked={index === 0}
                                    className="margin20"
                                />
                            </div>
                            <label
                                htmlFor={item._id}
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
                                                    handleDeleteAddress(item._id)
                                                }}
                                            >
                                                &nbsp; &nbsp;
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                />
                                            </span>
                                            <span
                                                className="btn-remove cursor"
                                                onClick={handleEditShow}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />
                                            </span>
                                            <EditAddressModal
                                                show={showEditModal}
                                                handleEditClose={handleEditClose}
                                                address={item}
                                                handleSave={handleSave}
                                            />
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
                    disabled={addressData?.length === 0 ? true : false}
                >
                    Go to Payment
                </button>
            </div>
            <Footer />
        </div>
    )
}

export default Checkout
