import { QuotesReduxData, ReduxData } from '../../Component/Types'
import { Action } from './actions'
import { ActionType } from './types'

interface ProductsState {
    productSpinner: boolean
    productAllData: ReduxData[]
    productDescData: ReduxData
    relatedProducts: ReduxData[]
    featureProductData: ReduxData[]
    latestProductData: ReduxData[]
    exclusiveProduct: ReduxData
    quotes: QuotesReduxData[]
    serachProduct: ReduxData[]
}

const initialState = {
    productSpinner: true,
    productAllData: [],
    productDescData: {
        id: 0,
        title: '',
        brand: '',
        price: 0,
        description: '',
        category: '',
        image: '',
        quantity: 0,
        size: '',
        rating: {
            rate: 0,
            count: 0,
        },
    },
    relatedProducts: [],
    featureProductData: [],
    latestProductData: [],
    exclusiveProduct: {
        id: 0,
        title: '',
        brand: '',
        price: 0,
        description: '',
        category: '',
        image: '',
        quantity: 0,
        size: '',
        rating: {
            rate: 0,
            count: 0,
        },
    },
    quotes: [],
    serachProduct: [],
}

const productReducer = (
    state: ProductsState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionType.PRODUCTS_SPINNER:
            return {
                ...state,
                productSpinner: action.payload,
            }
        case ActionType.GET_ALL_PRODUCT:
            return {
                ...state,
                productAllData: action.payload,
            }
        case ActionType.GET_PRODUCT_DESCRIPTION:
            return {
                ...state,
                productDescData: action.payload,
            }
        case ActionType.GET_RELATED_PRODUCTS:
            return {
                ...state,
                relatedProducts: action.payload,
            }
        case ActionType.GET_FEATURED_PRODUCT:
            return {
                ...state,
                featureProductData: action.payload,
            }
        case ActionType.GET_LATEST_PRODUCT:
            return {
                ...state,
                latestProductData: action.payload,
            }
        case ActionType.GET_EXCLUSIVE_PRODUCT:
            return {
                ...state,
                exclusiveProduct: action.payload,
            }
        case ActionType.QUOTES:
            return {
                ...state,
                quotes: action.payload,
            }
        case ActionType.GET_SEARCH_PRODUCT:
            return {
                ...state,
                serachProduct: action.payload,
            }
        default:
            return state
    }
}

export default productReducer
