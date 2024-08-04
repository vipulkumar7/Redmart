/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, FormEvent } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { updateAddress } from '../../redux/address/actions';
import { useDispatch } from 'react-redux';
import { getCookie } from '../../commonFunction';
import { AxiosHeaders } from '../Types';

interface Address {
  name: string;
  mobile: string;
  fullAddress: string;
  pincode: string;
  city: string;
  state: string;
  _id?: string
}

interface EditAddressModalProps {
  show: boolean;
  handleEditClose: () => void;
  address: Address;
  handleSave: (address: Address) => void;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({ show, handleEditClose, address, handleSave }) => {
  const dispatch = useDispatch();
  const [_id, setId] = useState<string | undefined>(address._id);
  const [name, setName] = useState<string>(address.name);
  const [mobile, setMobile] = useState<string>(address.mobile);
  const [fullAddress, setFullAddress] = useState<string>(address.fullAddress);
  const [pincode, setPincode] = useState<string>(address.pincode);
  const [city, setCity] = useState<string>(address.city);
  const [state, setState] = useState<string>(address.state);

  useEffect(() => {
    setName(address.name);
    setMobile(address.mobile);
    setFullAddress(address.fullAddress);
    setPincode(address.pincode);
    setCity(address.city);
    setState(address.state);
    setId(address._id);
  }, [address]);

  const userId: any = getCookie("userId")
  const headers: AxiosHeaders = {
      'Authorization': getCookie('authToken'),
      "userId": userId
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    const updatedAddress = { name, mobile, fullAddress, pincode, city, state, _id };
    dispatch(updateAddress(updatedAddress, _id, headers ));
    console.log(updatedAddress, '1234545')
    handleSave(updatedAddress);
    handleEditClose(); // Close modal after submission
  };

  return (
    <Modal show={show} onHide={handleEditClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formMobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFullAddress">
            <Form.Label>Full Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full address"
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </Form.Group>
          <button className='btn1'>
            Save Changes
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAddressModal;
