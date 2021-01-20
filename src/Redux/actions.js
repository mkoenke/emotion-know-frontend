import {
  ADD_JOURNAL,
  ALL_JOURNALS,
  DELETE_JOURNAL,
  LOGOUT,
  SET_CHILD,
  SET_JOURNAL,
} from "./actionTypes"

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
        dispatch(allJournals(data.child.journal_entries))
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
        dispatch(addJournalToAllJournals(data))
      })
  }
}
export function allJournals(arrayOfJournals) {
  return { type: ALL_JOURNALS, payload: arrayOfJournals }
}

export function addJournalToAllJournals(journal) {
  return { type: ADD_JOURNAL, payload: journal }
}

export function deleteJournal(journal) {
  return (dispatch) => {
    return fetch(`http://localhost:3000/journal_entries/${journal.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("deleted journal:", data)
        dispatch(removeJournal(journal))
      })
  }
}

function removeJournal(journal) {
  return { type: DELETE_JOURNAL, payload: journal }
}
