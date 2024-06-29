import { url } from '../api'
import { toast } from 'react-toastify'
import { ActionType } from './types'
import axios from 'axios'
import { Dispatch } from 'redux'
import { AuthData, UserRegisterData } from '../../Component/Types'

interface SignUp {
    type: ActionType.SIGN_UP
    token: string
}

interface AuthLoading {
    type: ActionType.AUTH_LOADING
    payload: boolean
}

interface SignIn {
    type: ActionType.SIGN_IN
    token: string
}

interface SignOut {
    type: ActionType.SIGN_OUT
    token: string
}

export const setAuthLoading = (isLoading: boolean) => {
    return {
        type: ActionType.AUTH_LOADING,
        payload: isLoading,
    }
}

export const setSignUp = (data: AuthData) => {
    return {
        type: ActionType.SIGN_UP,
        token: data,
    }
}

export const signUp = (user: UserRegisterData) => (dispatch: Dispatch) => {
    dispatch(setAuthLoading(true))
    axios
        .post(`${url}/signup`, user)
        .then((token) => {
            localStorage.setItem('token', token.data)
            dispatch(setSignUp(token.data))
            dispatch(setAuthLoading(false))
        })
        .catch((error) => {
            console.log(error.response)
            dispatch(setAuthLoading(false))
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        })
}

export const setSignIn = (data: string) => {
    return {
        type: ActionType.SIGN_IN,
        token: data,
    }
}

export const signIn =
    (email: string, password: string) => (dispatch: Dispatch) => {
        dispatch(setAuthLoading(true))
        axios
            .post(`${url}/signin`, { email, password })
            .then((token) => {
                localStorage.setItem('token', token.data)
                dispatch(setSignIn(token.data))
                dispatch(setAuthLoading(false))
            })
            .catch((error) => {
                console.log(error.response)
                dispatch(setAuthLoading(false))
                toast.error(error.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            })
    }

export const signOut = () => (dispatch: Dispatch) => {
    dispatch({
        type: ActionType.SIGN_OUT,
    })
}

// export const loadUser = () => (dispatch: Dispatch, getState: any) => {
//     const token = getState().auth.token;
//     if (token) {
//         dispatch({
//             type: ActionType.USER_LOADED,
//             token,
//         });
//     } else return null;
// };

export type Action = SignUp | AuthLoading | SignIn | SignOut
