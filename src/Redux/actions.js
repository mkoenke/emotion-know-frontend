import { SET_CHILD } from "./actionTypes"

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
