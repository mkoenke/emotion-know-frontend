import {
  ADD_JOURNAL,
  ALL_JOURNALS,
  ALL_REPORTS,
  DELETE_JOURNAL,
  LOGOUT,
  SET_CHILD,
  SET_JOURNAL,
  SET_PARENT,
} from "./actionTypes"

export function setChild(child) {
  return { type: SET_CHILD, payload: child }
}

export function setParent(parent) {
  return { type: SET_PARENT, payload: parent }
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
        dispatch(allReports(data.child.journal_entries))
      })
  }
}

export function loginParent(parent) {
  return (dispatch) => {
    return fetch("http://localhost:3000/parentLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(parent),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data:", data)
        localStorage.setItem("token", data.jwt)
        dispatch(setParent(data.parent))
        dispatch(setChild(data.parent.child))
        dispatch(allJournals(data.parent.journal_entries))
        dispatch(allReports(data.parent.journal_entries))
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

export function fetchReportsfromChild(child) {
  return (dispatch) => {
    return fetch(`http://localhost:3000/children/${child.id}/`)
      .then((resp) => resp.json())
      .then((childData) => {
        console.log("child data with reports:", childData)
        dispatch(setChild(childData))
        // dispatch(setReport())
        dispatch(allReports(childData.journal_entries))
      })
  }
}

export function allReports(arrayOfJournals) {
  let arrayOfReports = arrayOfJournals.map((journal) => journal.report)
  console.log(arrayOfReports)
  return { type: ALL_REPORTS, payload: arrayOfReports }
}

// export function setReport(report) {
//   return { type: SET_REPORT, payload: report }
// }
