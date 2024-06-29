import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress, getPin, postAddress } from '../../redux/address/actions'
import { IPostOffice } from '../Types'
import { RootState } from '../../redux/rootReducer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormModal: React.FC = (props: any) => {
    const dispatch = useDispatch()

    const [bool, setBool] = useState<boolean>(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [address, setAddress] = useState<any>({
        name: '',
        mobile: '',
        fullAddress: '',
        pincode: '',
        city: '',
        state: '',
        id: 0,
    })

    const postOffices: IPostOffice = useSelector(
        (state: RootState) => state.addressReducer.postOffices
    )
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        address.name &&
            address.mobile &&
            address.fullAddress &&
            address.pincode &&
            dispatch(postAddress(address))
        setAddress({
            name: '',
            mobile: '',
            fullAddress: '',
            pincode: '',
            city: '',
            state: '',
            id: 0,
        })
        props.onHide()
        dispatch(getAddress())
        setBool(false)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        if (e.target.value.length === 6) {
            setTimeout(() => {
                setBool(true)
            }, 1500)
            dispatch(getPin(e.target.value))
        }
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Form
                        onSubmit={(e) => {
                            handleSubmit(e)
                        }}
                    >
                        <label>Name</label>
                        <input
                            type="name"
                            placeholder="Enter name"
                            value={address.name || ''}
                            onChange={(e) => {
                                if (
                                    e.target.value.match('^[a-zA-Z ]*$') !==
                                    null
                                )
                                    setAddress({
                                        ...address,
                                        name: e.target.value,
                                    })
                            }}
                        />
                        <label>Mobile</label>
                        <input
                            type="tel"
                            placeholder="Mobile"
                            maxLength={10}
                            value={address.mobile || ''}
                            onChange={(e) => {
                                if (e.target.value.match('^[0-9]*$') !== null)
                                    setAddress({
                                        ...address,
                                        mobile: e.target.value,
                                    })
                            }}
                        />
                        <label>Pincode</label>
                        <input
                            type="text"
                            placeholder="Pincode"
                            maxLength={6}
                            value={address.pincode || ''}
                            onChange={(e) => {
                                if (e.target.value.match('^[0-9]*$') !== null)
                                    setAddress({
                                        ...address,
                                        pincode: e.target.value,
                                    })
                            }}
                            onBlur={(e) => {
                                handleBlur(e)
                            }}
                        />
                        <label>Address</label>
                        <input
                            type="text"
                            placeholder="Address"
                            value={address.fullAddress || ''}
                            onChange={(e) =>
                                setAddress({
                                    ...address,
                                    fullAddress: e.target.value,
                                })
                            }
                        />
                        <label>City</label>
                        <input
                            type="text"
                            placeholder="City"
                            // value={address.pincode !== '' && bool ? postOffices.District || '' : ''}
                            value={bool ? postOffices.District || '' : ''}
                            onChange={(e) => {
                                if (
                                    e.target.value.match('^[a-zA-Z ]*$') !==
                                    null
                                )
                                    setAddress({
                                        ...address,
                                        city: e.target.value,
                                    })
                            }}
                        />
                        <label>State</label>
                        <input
                            type="text"
                            placeholder="State"
                            // value={address.pincode !== '' && bool ? postOffices.State || '' : ''}
                            value={bool ? postOffices.State || '' : ''}
                            onChange={(e) => {
                                if (
                                    e.target.value.match('^[a-zA-Z ]*$') !==
                                    null
                                )
                                    setAddress({
                                        ...address,
                                        state: e.target.value,
                                    })
                            }}
                        />
                        <button type="submit" className="btn1">
                            Submit
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default FormModal
