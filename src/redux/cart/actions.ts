import { axiosInstance } from './../../axiosInstance/index'
import { ActionType } from './types'
import { Dispatch } from 'redux'
import { ReduxData } from '../../Component/Types'
import axios from 'axios'

interface GetCart {
    type: ActionType.GET_CART
    payload: ReduxData[]
}

interface AddToCart {
    type: ActionType.ADD_TO_CART
    payload: ReduxData[]
}

interface Spinner {
    type: ActionType.SPINNER
    payload: boolean
}

export const setCartSpinner = (isSpin: boolean) => {
    return {
        type: ActionType.SPINNER,
        payload: isSpin,
    }
}

export const setGetCart = (data: ReduxData[]) => {
    return {
        type: ActionType.GET_CART,
        payload: data,
    }
}

export const getCart = () => (dispatch: Dispatch) => {
    dispatch(setCartSpinner(true))
    axiosInstance
        .get(`https://redmart-products.onrender.com/cart`)
        .then((response) => {
            dispatch(setGetCart(response.data))
            dispatch(setCartSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setCartSpinner(false))
        })
}

export const postCart = (cart: ReduxData) => (dispatch: Dispatch) => {
    dispatch(setCartSpinner(true))
    axiosInstance
        .post(`https://redmart-products.onrender.com/cart`, cart)
        .then((response) => {
            dispatch(setCartSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setCartSpinner(false))
        })
}

export const cartIncrement = (cart: ReduxData) => (dispatch: Dispatch) => {
    cart.quantity = cart.quantity! + 1
    dispatch(setCartSpinner(true))
    axiosInstance
        .put(`https://redmart-products.onrender.com/cart/${cart.id}`, cart)
        .then((response) => {
            dispatch(setCartSpinner(false))
            dispatch(getCart())
        })
        .catch((error) => {
            console.log(error)
            dispatch(setCartSpinner(false))
        })
}

export const cartDecrement = (cart: ReduxData) => (dispatch: Dispatch) => {
    cart.quantity = cart.quantity! - 1
    dispatch(setCartSpinner(true))
    axiosInstance
        .put(`https://redmart-products.onrender.com/cart/${cart.id}`, cart)
        .then((response) => {
            dispatch(getCart())
            dispatch(setCartSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setCartSpinner(false))
        })
}

export const deleteCart = (id: number) => (dispatch: Dispatch) => {
    dispatch(setCartSpinner(true))
    axiosInstance
        .delete(`https://redmart-products.onrender.com/cart/${id}`)
        .then((response) => {
            dispatch(setCartSpinner(false))
            dispatch(getCart())
        })
        .catch((error) => {
            console.log(error)
            dispatch(setCartSpinner(false))
        })
}

export const deleteAllCart = (cartIds: number[]) => (dispatch: Dispatch) => {
    dispatch(setCartSpinner(true))
    let deleteAll: string[] = []
    for (let i = 0; i < cartIds.length; i++) {
        let endpoints = `https://redmart-products.onrender.com/cart/${cartIds[i]}`
        deleteAll.push(endpoints)
    }
    axios
        .all(deleteAll.map((endpoint) => axios.delete(endpoint)))
        .then((data) => {
            dispatch(setCartSpinner(false))
            dispatch(getCart())
        })
        .catch((errors) => {
            console.error(errors)
            dispatch(setCartSpinner(false))
        })
}

export type Action = GetCart | AddToCart | Spinner
