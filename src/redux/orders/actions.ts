import { IAddress } from './../../Component/Types'
import { axiosInstance } from './../../axiosInstance/index'
import { ActionType } from './types'
import { Dispatch } from 'redux'
import { ReduxData } from '../../Component/Types'

interface GetOrders {
    type: ActionType.GET_ORDERS
    payload: ReduxData[]
}

interface PostOrders {
    type: ActionType.POST_ORDERS
    payload: ReduxData[]
}

interface Spinner {
    type: ActionType.SPINNER
    payload: boolean
}

interface GetSearchOrder {
    type: ActionType.GET_SEARCH_ORDER
    payload: ReduxData[]
}

export const setOrdersSpinner = (isSpin: boolean) => {
    return {
        type: ActionType.SPINNER,
        payload: isSpin,
    }
}

export const setGetOrders = (data: ReduxData[]) => {
    return {
        type: ActionType.GET_ORDERS,
        payload: data,
    }
}

// export const getOrders = () => (dispatch: Dispatch) => {
//     dispatch(setOrdersSpinner(true))
//     axiosInstance
//         .get(`https://redmart-products.onrender.com/orders`)
//         .then((response) => {
//             dispatch(setGetOrders(response.data))
//             dispatch(setOrdersSpinner(false))
//         })
//         .catch((error) => {
//             console.log(error)
//             dispatch(setOrdersSpinner(false))
//         })
// }

//async await
export const getOrders = () => async (dispatch: Dispatch) => {
    dispatch(setOrdersSpinner(true))
    try {
        const response = await axiosInstance.get(`https://redmart-products.onrender.com/orders`)
        dispatch(setGetOrders(response.data))
        dispatch(setOrdersSpinner(false))
    } catch (error) {
        console.log(error)
        dispatch(setOrdersSpinner(false))
    }
}

export const setPostOrders = (data: ReduxData[]) => {
    return {
        type: ActionType.POST_ORDERS,
        payload: data,
    }
}

export const postOrders =
    (cart: ReduxData[], address: IAddress) => (dispatch: Dispatch) => {
        dispatch(setOrdersSpinner(true))
        axiosInstance
            .post(`https://redmart-products.onrender.com/orders`, { cart, address })
            .then((response) => {
                dispatch(setPostOrders(response.data))
                dispatch(setOrdersSpinner(false))
            })
            .catch((error) => {
                console.log(error)
                dispatch(setOrdersSpinner(false))
            })
    }

export const setSearchOrder = (data: ReduxData[]) => {
    return {
        type: ActionType.GET_SEARCH_ORDER,
        payload: data,
    }
}

export const getSearchOrder = (search: string) => (dispatch: Dispatch) => {
    dispatch(setOrdersSpinner(true))
    axiosInstance
        .get(`https://redmart-products.onrender.com/orders`, { params: { q: search } })
        .then((response) => {
            dispatch(setSearchOrder(response.data))
            dispatch(setOrdersSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setOrdersSpinner(false))
        })
}

interface GetOrdersById {
    type: ActionType.GET_ORDERS_BY_ID
    payload: any
}

export const setGetOrderById = (data: any) => {
    return {
        type: ActionType.GET_ORDERS_BY_ID,
        payload: data,
    }
}

export const getOrdersById = (id: number) => async (dispatch: Dispatch) => {
    dispatch(setOrdersSpinner(true))
    try {
        const response = await axiosInstance.get(
            `https://redmart-products.onrender.com/orders/${id}`
        )
        dispatch(setGetOrderById(response.data))
        dispatch(setOrdersSpinner(false))
    } catch (error) {
        console.log(error)
        dispatch(setOrdersSpinner(false))
    }
}

export type Action =
    | GetOrders
    | PostOrders
    | Spinner
    | GetSearchOrder
    | GetOrdersById
