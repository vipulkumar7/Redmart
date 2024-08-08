import { ReduxData } from '../../Component/Types'
import { Action } from './actions'
import { ActionType } from './types'

interface CartState {
    spinner: boolean
    cartData: ReduxData[]
}

const initialState = {
    spinner: true,
    cartData: [],
}

const cartReducer = (state: CartState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.SPINNER:
            return {
                ...state,
                spinner: action.payload,
            }
        case ActionType.GET_CART:
            return {
                ...state,
                cartData: action.payload,
            }
        default:
            return state
    }
}

export default cartReducer
