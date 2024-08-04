/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    faEdit,
    faThumbtack,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import ButtonToolbar from 'react-bootstrap/esm/ButtonToolbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress } from '../../redux/address/actions'
import { RootState } from '../../redux/rootReducer'
// import FormModal from '../modals/FormModal'
import { AxiosHeaders, IAddress } from '../Types'
import Footer from './Footer'
import Header from './Header'
import { getCookie } from '../../commonFunction'
// import UpdateAddress from './UpdateAddress'

const Address: React.FC = () => {
    const dispatch = useDispatch()

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
    const [currentAddress, setCurrentAddress] = useState<IAddress[]>([])

    const addressData: IAddress[] = useSelector(
        (state: RootState) => state.addressReducer.addressData
    )

    const userId: any = getCookie("userId")
    const headers: AxiosHeaders = {
        'Authorization': getCookie('authToken'),
        "userId": userId
    }

    useEffect(() => {
        setCurrentAddress(addressData)
        dispatch(getAddress(headers))
    }, [])

    // const addModalClose = () => {
    //     setAddModalShow(false)
    // }

    // const updateModalClose = () => {
    //     setUpdateModalShow(false)
    // }

    const handleDeleteAddress = (id: number) => {
        console.log(id)
        // dispatch(deleteAddress(id))
        dispatch(getAddress(headers))
    }

    const handleEditAddress = (item: IAddress) => {
        console.log(item, 'item in handleEditAddress')
        setEditData(item)
        setUpdateModalShow(true)
    }

    const array_move = (
        arr: IAddress[],
        old_index: number,
        new_index: number
    ) => {
        if (new_index >= arr.length) {
            let k = new_index - arr.length + 1
            while (k--) {
                arr.push(undefined!)
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
        return arr
    }

    const setAsDefault = (index: number) => {
        setCurrentAddress(array_move(addressData, index, 0))
    }
    return (
        <div id="page-container">
            <Header />
            <div className="small-container cart-page" id="content-wrap">
                <div className="row row-2-address">
                    <h3>
                        {currentAddress.length !== 0
                            ? 'Manage Addresses'
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
                    {currentAddress.map((item: IAddress, index) => (
                        <div key={item.id}>
                            <label className="cursor">
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
                                            <span
                                                onClick={() => {
                                                    setAsDefault(index)
                                                }}
                                            >
                                                {index !== 0 ? (
                                                    <FontAwesomeIcon
                                                        icon={faThumbtack}
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </span>
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
            </div>
            <Footer />
        </div>
    )
}

export default Address
