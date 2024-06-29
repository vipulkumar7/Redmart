import { IAddress, IPostOffice } from './../../Component/Types'
import { Action } from './actions'
import { ActionType } from './types'

interface AddressState {
    spinner: boolean
    addressData: IAddress[]
    postOffices: IPostOffice
}

const initialState = {
    spinner: true,
    addressData: [],
    postOffices: {
        Block: '',
        BranchType: '',
        Circle: '',
        Country: '',
        DeliveryStatus: '',
        Description: null,
        District: '',
        Division: '',
        Name: '',
        Pincode: '',
        Region: '',
        State: '',
    },
}

const addressReducer = (state: AddressState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.SPINNER:
            return {
                ...state,
                spinner: action.payload,
            }
        case ActionType.GET_ADDRESS:
            return {
                ...state,
                addressData: action.payload,
            }
        case ActionType.GET_PIN:
            return {
                ...state,
                postOffices: action.payload,
            }
        default:
            return state
    }
}

export default addressReducer
