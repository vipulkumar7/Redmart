import { ActionType } from './types'
import { Dispatch } from 'redux'
import { ReduxData, RemoveCartType } from '../../Component/Types'

interface AddtoCart {
    type: ActionType.ADD_TO_CART
    payload: ReduxData
}

interface RemoveFromCart {
    type: ActionType.REMOVE_FROM_CART
    payload: RemoveCartType
}

interface AddQuantity {
    type: ActionType.INCREMENT_CART
    payload: number
}

interface SubQuantity {
    type: ActionType.DECREMENT_CART
    payload: number
}

export const setAddToCart = (productDescData: ReduxData) => {
    return {
        type: ActionType.ADD_TO_CART,
        payload: productDescData,
    }
}

export const addtoCart =
    (productDescData: ReduxData) => (dispatch: Dispatch) => {
        dispatch(setAddToCart(productDescData))
    }

export const setRemoveFromCart = ({
    cartId,
    cartQuantity,
}: {
    cartId: number
    cartQuantity: number
}) => {
    return {
        type: ActionType.REMOVE_FROM_CART,
        payload: { cartId, cartQuantity },
    }
}

export const removeFromCart =
    (cartId: number, cartQuantity: number) => (dispatch: Dispatch) => {
        dispatch(setRemoveFromCart({ cartId, cartQuantity }))
    }

export const setAddQuantity = (index: number) => {
    return {
        type: ActionType.INCREMENT_CART,
        payload: index,
    }
}

export const addQuantity = (index: number) => (dispatch: Dispatch) => {
    dispatch(setAddQuantity(index))
}

export const setSubQuantity = (index: number) => {
    return {
        type: ActionType.DECREMENT_CART,
        payload: index,
    }
}

export const subQuantity = (index: number) => (dispatch: Dispatch) => {
    dispatch(setSubQuantity(index))
}

export type Action = AddtoCart | RemoveFromCart | AddQuantity | SubQuantity
