import { toast } from 'react-toastify'
import { ReduxData } from '../../Component/Types'
import { Action } from './actions'
import { ActionType } from './types'

interface CartState {
    cartTableData: ReduxData[]
    myTotalCount: number
}

const initialState = {
    cartTableData: [],
    myTotalCount: 0,
}

const sumObjectsByKey = (obj1: ReduxData, obj2: ReduxData) => {
    if (obj1.hasOwnProperty('quantity') === obj2.hasOwnProperty('quantity')) {
        let x = obj1.quantity! + obj2.quantity!
        delete obj1.quantity
        obj1.quantity = x
    }
    return obj1
}

const calculateTotal = (items: ReduxData[]) => {
    let newItems = [...items]
    return newItems.reduce((total, item) => {
        return total + item.quantity!
    }, 0)
}

const cartReducer = (state: CartState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.ADD_TO_CART:
            toast.success('Added to Cart', {
                position: toast.POSITION.TOP_CENTER,
            })
            let existItem = false
            const cartItem = [
                ...state.cartTableData.map((item: ReduxData) => {
                    if (item.id === action.payload.id) {
                        existItem = true
                        return sumObjectsByKey(item, action.payload)
                    } else {
                        return item
                    }
                }),
            ]
            let newItems2 = [...state.cartTableData, action.payload]
            return {
                ...state,
                cartTableData: existItem
                    ? cartItem
                    : [...state.cartTableData, action.payload],
                myTotalCount: existItem
                    ? state.myTotalCount + action.payload.quantity!
                    : calculateTotal(newItems2),
            }
        case ActionType.REMOVE_FROM_CART:
            toast.success('Removed from Cart', {
                position: toast.POSITION.TOP_CENTER,
            })
            return {
                ...state,
                cartTableData: [
                    ...state.cartTableData.filter((item) => {
                        return item.id !== action.payload.cartId
                    }),
                ],
                myTotalCount: state.myTotalCount - action.payload.cartQuantity,
            }
        case ActionType.INCREMENT_CART:
            toast.success('Quantity increased', {
                position: toast.POSITION.TOP_CENTER,
            })
            let newItems = [...state.cartTableData]
            newItems[action.payload].quantity =
                newItems[action.payload].quantity! + 1
            return {
                cartTableData: [...newItems],
                myTotalCount: calculateTotal(newItems),
            }
        case ActionType.DECREMENT_CART:
            toast.success('Quantity decreased', {
                position: toast.POSITION.TOP_CENTER,
            })
            let newItems1 = [...state.cartTableData]
            if (newItems1[action.payload].quantity! > 1) {
                newItems1[action.payload].quantity =
                    newItems1[action.payload].quantity! - 1
            }
            return {
                cartTableData: [...newItems1],
                myTotalCount: calculateTotal(newItems1),
            }
        default:
            return state
    }
}

export default cartReducer
