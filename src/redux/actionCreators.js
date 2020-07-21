import * as ActionTypes from './actionTypes'
import { DISHES } from '../shared/dishes'


export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment
  }
})


export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true))

  setTimeout(() => {
    dispatch(addDishes(DISHES))
  }, 2000)
}


export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
})


export const dishesFailed = (errorMessage) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errorMessage
})


export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
})
