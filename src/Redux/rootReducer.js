import { combineReducers } from "redux"
import { LOGOUT, SET_CHILD, SET_JOURNAL } from "./actionTypes"

const defaultState = {
  child: null,
  journal: null,
}

function childReducer(prevState = defaultState.child, action) {
  switch (action.type) {
    case SET_CHILD:
      console.log("Set child: ", action.payload)

      return action.payload
    case LOGOUT:
      return null
    default:
      return prevState
  }
}

function journalReducer(prevState = defaultState.journal, action) {
  switch (action.type) {
    case SET_JOURNAL:
      console.log("Journal in reducer: ", action.payload)
      return action.payload
    default:
      return prevState
  }
}

const rootReducer = combineReducers({
  child: childReducer,
  journal: journalReducer,
})

export default rootReducer
