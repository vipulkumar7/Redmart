import { IPosts, RandomData } from '../../Component/Types'
import { Action } from './actions'
import { ActionType } from './types'

interface AboutState {
    randomData: RandomData[],
    posts: IPosts[],
}

const initialState = {
    randomData: [],
    posts: [],
}

const aboutReducer = (state: AboutState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.SPINNER:
            return {
                ...state,
                spinner: action.payload,
            }
        case ActionType.GET_ALL_RANDOM_DATA:
            return {
                ...state,
                randomData: action.payload,
            }
        case ActionType.GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state;
    }
}

export default aboutReducer;
