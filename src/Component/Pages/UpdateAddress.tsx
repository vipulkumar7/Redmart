/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
// import { useDispatch } from 'react-redux'
// import { updateAddress } from '../../redux/address/actions'
import { IAddress } from '../Types'

const UpdateAddress: React.FC = (props: any) => {
    // const dispatch = useDispatch()
    const currentAddress: IAddress = props.editdata
    const [address, setAddress] = useState(currentAddress)

    useEffect(() => {
        setAddress(currentAddress)
    }, [currentAddress])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // dispatch(updateAddress(address, props.editdata.id))
        props.onHide()
        // dispatch(getAddress())
    }

    return (
        <>
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
                            value={address.city || ''}
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
                            value={address.state || ''}
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
        </>
    )
}

export default UpdateAddress
