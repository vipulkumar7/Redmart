/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import productReducer from './productPage/reducer'
import aboutReducer from './aboutPage/reducer'
import addressReducer from './address/reducer'
import ordersReducer from './orders/reducer'
import cartReducer from './cart/reducer'
import { Action } from './auth/actions'
import { ActionType } from './auth/types'

const appReducer = combineReducers({
    authReducer,
    productReducer,
    aboutReducer,
    addressReducer,
    ordersReducer,
    cartReducer,
})

const rootReducer: any = (state: any, action: Action) => {
    if (action.type === ActionType.SIGN_OUT) {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
