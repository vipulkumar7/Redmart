/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionType } from './types'
import { Dispatch } from 'redux'
import { IPosts, RandomData } from '../../Component/Types'
import axiosInstance from '../../axiosInstance'

interface GetAllRandomData {
    type: ActionType.GET_ALL_RANDOM_DATA
    payload: RandomData[]
}

interface Spinner {
    type: ActionType.SPINNER
    payload: boolean
}

export const setSpinner = (isSpin: boolean) => {
    return {
        type: ActionType.SPINNER,
        payload: isSpin,
    }
}

export const setRandomData = (data: RandomData[]) => {
    return {
        type: ActionType.GET_ALL_RANDOM_DATA,
        payload: data,
    }
}

export const getRandomData = () => (dispatch: Dispatch) => {
    dispatch(setSpinner(true))
    axiosInstance
        ?.get(`https://redmart-products.onrender.com/randomData`)
        .then((response) => {
            dispatch(setRandomData(response.data))
            dispatch(setSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setSpinner(false))
        })
}

//Redux Saga

interface GetPostsSuccess {
    type: ActionType.GET_POSTS_SUCCESS
    payload: IPosts[]
}

export const getPostsFetch = () => {
    return {
        type: ActionType.GET_POSTS_FETCH
    }
}

export const getPostsSuccess = (posts: IPosts[]) => {
    return {
        type: ActionType.GET_POSTS_SUCCESS,
        payload: posts
    }
}

export function* workGetPostsFetch(): any {
    yield axiosInstance?.get(`https://jsonplaceholder.typicode.com/posts`)
        .then((response) => {
            getPostsSuccess(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
}

export type Action = GetAllRandomData | Spinner | GetPostsSuccess;
