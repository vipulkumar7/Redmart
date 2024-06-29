import { ActionType } from './types'
import { Dispatch } from 'redux'
import { QuotesReduxData, ReduxData } from '../../Component/Types'
import axiosInstance from '../../axiosInstance'

interface GetAllProduct {
    type: ActionType.GET_ALL_PRODUCT
    payload: ReduxData[]
}

interface ProductsSpinner {
    type: ActionType.PRODUCTS_SPINNER
    payload: boolean
}

interface GetProductDescription {
    type: ActionType.GET_PRODUCT_DESCRIPTION
    payload: ReduxData
}

interface GetRelatedProducts {
    type: ActionType.GET_RELATED_PRODUCTS
    payload: ReduxData[]
}

interface GetFeaturedProduct {
    type: ActionType.GET_FEATURED_PRODUCT
    payload: ReduxData[]
}

interface GetLatestProduct {
    type: ActionType.GET_LATEST_PRODUCT
    payload: ReduxData[]
}

interface GetExclusiveProduct {
    type: ActionType.GET_EXCLUSIVE_PRODUCT
    payload: ReduxData
}

interface GetQuotes {
    type: ActionType.QUOTES
    payload: QuotesReduxData[]
}

interface GetSearchProduct {
    type: ActionType.GET_SEARCH_PRODUCT
    payload: ReduxData[]
}

export const setProductsSpinner = (isSpin: boolean) => {
    return {
        type: ActionType.PRODUCTS_SPINNER,
        payload: isSpin,
    }
}

export const setAllProduct = (data: ReduxData[]) => {
    return {
        type: ActionType.GET_ALL_PRODUCT,
        payload: data,
    }
}

export const getAllProduct = () => (dispatch: Dispatch) => {
    dispatch(setProductsSpinner(true))
    axiosInstance
        .get(`https://redmart-products.onrender.com/products`)
        .then((response) => {
            dispatch(setAllProduct(response.data))
            dispatch(setProductsSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setProductsSpinner(false))
        })
}

export const setProductDescription = (data: ReduxData) => {
    return {
        type: ActionType.GET_PRODUCT_DESCRIPTION,
        payload: data,
    }
}

export const getProductDescription = (id: string) => (dispatch: Dispatch) => {
    dispatch(setProductsSpinner(true))
    axiosInstance
        .get(`https://redmart-products.onrender.com/products/${id}`)
        .then((response) => {
            dispatch(setProductDescription(response.data))
            dispatch(setProductsSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setProductsSpinner(false))
        })
}

export const setRelatedProducts = (data: ReduxData[]) => {
    return {
        type: ActionType.GET_RELATED_PRODUCTS,
        payload: data,
    }
}

export const getRelatedProducts = () => (dispatch: Dispatch) => {
    dispatch(setProductsSpinner(true))
    axiosInstance
        .get(`https://redmart-products.onrender.com/products?_start=9&_limit=4`)
        .then((response) => {
            dispatch(setRelatedProducts(response.data))
            dispatch(setProductsSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setProductsSpinner(false))
        })
}

export const setFeaturedProduct = (data: ReduxData[]) => {
    return {
        type: ActionType.GET_FEATURED_PRODUCT,
        payload: data,
    }
}

export const getFeaturedProduct = () => (dispatch: Dispatch) => {
    dispatch(setProductsSpinner(true))
    axiosInstance
        .get(`https://redmart-products.onrender.com/products?_start=21&_limit=4`)
        .then((response) => {
            dispatch(setFeaturedProduct(response.data))
            dispatch(setProductsSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setProductsSpinner(false))
        })
}

export const setLatestProduct = (data: ReduxData[]) => {
    return {
        type: ActionType.GET_LATEST_PRODUCT,
        payload: data,
    }
}

export const getLatestProduct = () => (dispatch: Dispatch) => {
    dispatch(setProductsSpinner(true))
    axiosInstance
        .get(`https://redmart-products.onrender.com/products?_start=25&_limit=8`)
        .then((response) => {
            dispatch(setLatestProduct(response.data))
            dispatch(setProductsSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setProductsSpinner(false))
        })
}

export const setExclusiveProduct = (data: ReduxData) => {
    return {
        type: ActionType.GET_EXCLUSIVE_PRODUCT,
        payload: data,
    }
}

export const getExclusiveProduct = () => (dispatch: Dispatch) => {
    dispatch(setProductsSpinner(true))
    axiosInstance
        .get(`https://redmart-products.onrender.com/products/25`)
        .then((response) => {
            dispatch(setExclusiveProduct(response.data))
            dispatch(setProductsSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setProductsSpinner(false))
        })
}

export const setQuotes = (data: QuotesReduxData[]) => {
    return {
        type: ActionType.QUOTES,
        payload: data,
    }
}

export const getQuotes = () => (dispatch: Dispatch) => {
    dispatch(setProductsSpinner(true))
    axiosInstance
        .get(`https://redmart-products.onrender.com/quotes`)
        .then((response) => {
            dispatch(setQuotes(response.data))
            dispatch(setProductsSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setProductsSpinner(false))
        })
}

export const setSearchProduct = (data: ReduxData[]) => {
    return {
        type: ActionType.GET_SEARCH_PRODUCT,
        payload: data,
    }
}

export const getSearchProduct = (search: string) => (dispatch: Dispatch) => {
    dispatch(setProductsSpinner(true))
    axiosInstance
        .get(`https://redmart-products.onrender.com/products`, { params: { q: search } })
        .then((response) => {
            dispatch(setSearchProduct(response.data))
            dispatch(setProductsSpinner(false))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setProductsSpinner(false))
        })
}

export type Action =
    | GetAllProduct
    | ProductsSpinner
    | GetProductDescription
    | GetRelatedProducts
    | GetFeaturedProduct
    | GetLatestProduct
    | GetExclusiveProduct
    | GetQuotes
    | GetSearchProduct
