import * as ActionTypes from './actionTypes'
import { baseUrl } from '../shared/baseUrl'


export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
})


export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: 1,
    author: author,
    comment: comment
  }

  newComment.date = new Date().toISOString()

  return fetch(baseUrl + '/comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.ok) return res
      else {
        const error = new Error(`Error ${res.status}: ${res.statusText}`)
        error.response = res
      }
    }, err => {
      const errMessage = new Error(err.message)
      throw errMessage
    })
    .then(res => res.json())
    .then(dishes => dispatch(addComment(dishes)))
    .catch(error => console.log(error))
}


export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true))

  return fetch(baseUrl + '/dishes')
    .then(res => {
      if (res.ok) return res
      else {
        const error = new Error(`Error ${res.status}: ${res.statusText}`)
        error.response = res
      }
    }, err => {
      const errMessage = new Error(err.message)
      throw errMessage
    })
    .then(res => res.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
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


export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + '/comments')
    .then(res => {
      if (res.ok) return res
      else {
        const error = new Error(`Error ${res.status}: ${res.statusText}`)
        error.response = res
      }
    }, err => {
      const errMessage = new Error(err.message)
      throw errMessage
    })
    .then(res => res.json())
    .then(dishes => dispatch(addComments(dishes)))
    .catch(error => dispatch(commentsFailed(error.message)))
}


export const commentsFailed = (errorMessage) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errorMessage
})


export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
})


export const fetchPromos = () => (dispatch) => {
  return fetch(baseUrl + '/promotions')
    .then(res => {
      if (res.ok) return res
      else {
        const error = new Error(`Error ${res.status}: ${res.statusText}`)
        error.response = res
      }
    }, err => {
      const errMessage = new Error(err.message)
      throw errMessage
    })
    .then(res => res.json())
    .then(dishes => dispatch(addPromos(dishes)))
    .catch(error => dispatch(promosFailed(error.message)))
}


export const promosFailed = (errorMessage) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errorMessage
})


export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
})


export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
})
