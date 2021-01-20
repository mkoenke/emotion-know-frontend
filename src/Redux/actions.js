import { LOGOUT, SET_CHILD, SET_JOURNAL } from "./actionTypes"

export function setChild(child) {
  return { type: SET_CHILD, payload: child }
}

export function login(child) {
  return (dispatch) => {
    return fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(child),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data:", data)
        localStorage.setItem("token", data.jwt)
        dispatch(setChild(data.child))
      })
  }
}

export function logout() {
  return { type: LOGOUT }
}

export function setJournal(journal) {
  return { type: SET_JOURNAL, payload: journal }
}

export function postJournal(journal) {
  return (dispatch) => {
    return fetch("http://localhost:3000/journal_entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(journal),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("returned journal:", data)
        dispatch(setJournal(data))
      })
  }
}
