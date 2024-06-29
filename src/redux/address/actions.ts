import { ActionType } from './types'
import { Dispatch } from 'redux'
import { IAddress, IPostOffice } from '../../Component/Types'
import axiosInstance from '../../axiosInstance'
import axios from 'axios'

interface Spinner {
    type: ActionType.SPINNER
    payload: boolean
}

interface GetAddress {
    type: ActionType.GET_ADDRESS
    payload: IAddress[]
}

export const setSpinner = (isSpin: boolean) => {
    return {
        type: ActionType.SPINNER,
        payload: isSpin,
    }
}

export const postAddress = (address: IAddress) => (dispatch: Dispatch) => {
    dispatch(setSpinner(true))
    axiosInstance
        .post(`https://redmart-products.onrender.com/address`, address)
        .then((response) => {
            dispatch(setSpinner(false))
            // dispatch(getAddress())
        })
        .catch((error) => {
            console.log(error)
            dispatch(setSpinner(false))
        })
}

export const setAddress = (data: IAddress[]) => {
    return {
        type: ActionType.GET_ADDRESS,
        payload: data,
    }
}

export const getAddress = () => (dispatch: Dispatch) => {
    dispatch(setSpinner(true))
    axiosInstance
        .get(`https://redmart-products.onrender.com/address`)
        .then((response) => {
            dispatch(setAddress(response.data))
            dispatch(setSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setSpinner(false))
        })
}

export const setRemoveAddress = (data: number) => {
    return {
        type: ActionType.REMOVE_ADDRESS,
        payload: data,
    }
}

export const deleteAddress = (id: number) => (dispatch: Dispatch) => {
    dispatch(setSpinner(true))
    axios
        .delete(`https://redmart-products.onrender.com/address/${id}`)
        .then((response) => {
            dispatch(setRemoveAddress(response.data))
            // dispatch(getAddress())
            dispatch(setSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setSpinner(false))
        })
}

export const updateAddress =
    (address: IAddress, id: number) => (dispatch: Dispatch) => {
        dispatch(setSpinner(true))
        axiosInstance
            .put(`https://redmart-products.onrender.com/address/${id}`, address)
            .then((response) => {
                dispatch(setSpinner(false))
            })
            .catch((error) => {
                console.log(error)
                dispatch(setSpinner(false))
            })
    }

interface GetPin {
    type: ActionType.GET_PIN
    payload: IPostOffice
}

export const setPin = (data: IPostOffice) => {
    return {
        type: ActionType.GET_PIN,
        payload: data,
    }
}

export const getPin = (pin: string) => (dispatch: Dispatch) => {
    dispatch(setSpinner(true))
    axios
        .get(`https://api.postalpincode.in/pincode/${pin}`)
        .then((response) => {
            dispatch(setPin(response.data[0].PostOffice[0]))
            dispatch(setSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setSpinner(false))
        })
}

export type Action = Spinner | GetAddress | GetPin
