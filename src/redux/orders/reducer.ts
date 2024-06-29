import { ReduxData, IOrders } from '../../Component/Types'
import { Action } from './actions'
import { ActionType } from './types'

interface CartState {
    spinner: boolean
    ordersAllData: any
    serachOrder: ReduxData[]
    orderWithId: any
}

const initialState = {
    spinner: true,
    ordersAllData: [],
    serachOrder: [],
    orderWithId: {},
}

const ordersReducer = (state: CartState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.SPINNER:
            return {
                ...state,
                spinner: action.payload,
            }
        case ActionType.GET_ORDERS:
            return {
                ...state,
                ordersAllData: action.payload,
            }
        case ActionType.GET_SEARCH_ORDER:
            return {
                ...state,
                serachOrder: action.payload,
            }
        case ActionType.GET_ORDERS_BY_ID:
            return {
                ...state,
                orderWithId: action.payload,
            }
        default:
            return state
    }
}

export default ordersReducer
