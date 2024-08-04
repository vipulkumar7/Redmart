/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, FormEvent } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { getAddress, postAddress } from '../../redux/address/actions';
import { getCookie } from '../../commonFunction';
import { AddressProps, AxiosHeaders } from '../Types';
import { useDispatch } from 'react-redux';

interface AddAddressModalProps {
    show: boolean;
    handleAddClose: () => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({ show, handleAddClose }) => {
    const dispatch = useDispatch()

    const [address, setAddress] = useState<AddressProps>({
        name: '',
        mobile: '',
        fullAddress: '',
        pincode: '',
        city: '',
        state: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const userId: any = getCookie("userId")
    const headers: AxiosHeaders = {
        'Authorization': getCookie('authToken'),
        "userId": userId
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        address.name &&
            address.mobile &&
            address.fullAddress &&
            address.pincode &&
            address.city &&
            address.state
        dispatch(postAddress(address, headers))
        setAddress({
            name: '',
            mobile: '',
            fullAddress: '',
            pincode: '',
            city: '',
            state: '',
        })
        dispatch(getAddress(headers))
        // Handle form submission logic here
        // console.log({ name, mobile, fullAddress, pincode, city });
        handleAddClose(); // Close modal after submission
    };

    return (
        <Modal show={show} onHide={handleAddClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            value={address.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formMobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter mobile number"
                            name="mobile"
                            value={address.mobile}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formFullAddress">
                        <Form.Label>Full Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter full address"
                            name="fullAddress"
                            value={address.fullAddress}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPincode">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter pincode"
                            name="pincode"
                            value={address.pincode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter city"
                            name="city"
                            value={address.city}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter state"
                            name="state"
                            value={address.state}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <button className='btn1' type="submit">
                        Add Address
                    </button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddAddressModal;
