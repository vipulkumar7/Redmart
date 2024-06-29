import { toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'
import { AuthData, user } from '../../Component/Types'
import { Action } from './actions'
import { ActionType } from './types'

const initialState = {
    token: localStorage.getItem('token'),
    name: null,
    email: null,
    _id: null,
    isLoading: true,
}

const authReducer = (state: AuthData = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.AUTH_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }
        case ActionType.SIGN_IN:
        case ActionType.SIGN_UP:
            toast('Welcome...', {
                position: toast.POSITION.TOP_CENTER,
            })
            const user: user = jwtDecode(action.token)
            return {
                ...initialState,
                token: action.token,
                name: user.name,
                email: user.email,
                _id: user._id,
            }
        case ActionType.SIGN_OUT:
            localStorage.removeItem('token')
            toast('Goodbye...', {
                position: toast.POSITION.TOP_CENTER,
            })
            return {
                token: null,
                name: null,
                email: null,
                _id: null,
            }
        default:
            return state
    }
}

export default authReducer
