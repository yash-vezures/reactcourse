import * as ActionTypes from './actionTypes'


export const Promotions = (state = { isLoading: true, errorMessage: null, promotions: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS: return { ...state, isLoading: false, errorMessage: null, promotions: action.payload }

    case ActionTypes.PROMOS_LOADING: return { ...state, isLoading: true, promotions: [], errorMessage: null }

    case ActionTypes.PROMOS_FAILED: return { ...state, isLoading: false, promotions: [], errorMessage: action.payload }

    default: return state
  }
}
