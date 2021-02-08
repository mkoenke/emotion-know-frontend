import {
  ADD_AUDIO,
  ADD_JOURNAL,
  ADD_REPORT,
  ADD_VIDEO,
  ALL_AUDIOS,
  ALL_JOURNALS,
  ALL_REPORTS,
  ALL_VIDEOS,
  DELETE_AUDIO,
  DELETE_JOURNAL,
  DELETE_VIDEO,
  LOGOUT,
  MODAL_OPEN,
  PARENTS_REPORTS,
  PARENT_MODAL_OPEN,
  SET_CHILD,
  SET_ERROR,
  SET_PARENT,
} from "./actionTypes"

export function setModal(value) {
  return { type: MODAL_OPEN, payload: value }
}

export function setParentModal(value) {
  return { type: PARENT_MODAL_OPEN, payload: value }
}

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
        if (!data.error) {
          console.log("data:", data)
          localStorage.setItem("token", data.jwt)

          dispatch(setChild(data.child))
          dispatch(setModal(false))
          dispatch(setError(null))
          dispatch(allJournals(data.child.journal_entries))
          dispatch(allAudios(data.child.audio_entries))
          dispatch(allVideos(data.child.video_entries))
          dispatch(
            allReports(
              data.child.journal_entries,
              data.child.audio_entries,
              data.child.video_entries
            )
          )
        } else {
          dispatch(setError(data.error))
        }
      })
  }
}

export function setError(error) {
  return { type: SET_ERROR, payload: error }
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
        if (!data.error) {
          console.log("data:", data)
          localStorage.setItem("token", data.jwt)

          dispatch(setParent(data.parent))
          dispatch(setChild(data.parent.child))
          dispatch(setParentModal(false))
          dispatch(setError(null))
          dispatch(
            parentsReports(
              data.parent.reports,
              data.parent.audio_reports,
              data.parent.video_reports
            )
          )
        } else {
          dispatch(setError(data.error))
        }
      })
  }
}

export function logout() {
  return { type: LOGOUT }
}

export function postJournal(journal) {
  return (dispatch) => {
    const token = localStorage.getItem("token")
    return fetch("http://localhost:3000/journal_entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(journal),
    })
      .then((resp) => resp.json())
      .then((journal) => {
        console.log("returned journal:", journal)
        dispatch(addJournalToAllJournals(journal))
        dispatch(addReportToAllReports(journal.report))
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

export function allReports(arrayOfJournals, arrayOfAudios, arrayOfVideos) {
  console.log("Array of journals: ", arrayOfJournals)
  let arrayOfJournalReports = arrayOfJournals.map((journal) => journal.report)
  console.log("Array of journal reports:", arrayOfJournalReports)
  let arrayOfAudioReports = arrayOfAudios.map((audio) => audio.audio_report)
  console.log("Array of audios: ", arrayOfAudios)
  console.log("Array of audio reports:", arrayOfAudioReports)
  let arrayOfVideoReports = arrayOfVideos.map((video) => video.video_report)
  console.log("Array of Video reports: ", arrayOfVideoReports)
  let arrayOfReports = [
    ...arrayOfJournalReports,
    ...arrayOfAudioReports,
    ...arrayOfVideoReports,
  ]
  let sortedReports = arrayOfReports.sort(function (a, b) {
    return new Date(a.created_at) - new Date(b.created_at)
  })
  console.log("Sorted reports: ", sortedReports)

  return { type: ALL_REPORTS, payload: sortedReports }
}

export function addReportToAllReports(report) {
  return { type: ADD_REPORT, payload: report }
}

export function parentsReports(journalReports, audioReports, videoReports) {
  let arrayOfReports = [...journalReports, ...audioReports, ...videoReports]
  let sortedReports = arrayOfReports.sort(function (a, b) {
    return new Date(a.created_at) - new Date(b.created_at)
  })
  console.log("ARRAY OF SORTED PARENTS REPORTS: ", sortedReports)
  return { type: PARENTS_REPORTS, payload: sortedReports }
}

export function allAudios(arrayOfAudios) {
  return { type: ALL_AUDIOS, payload: arrayOfAudios }
}

export function addAudioToAllAudio(audioJournal) {
  return { type: ADD_AUDIO, payload: audioJournal }
}

export function deleteAudio(journal) {
  return (dispatch) => {
    return fetch(`http://localhost:3000/audio_entries/${journal.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("deleted audio journal:", data)
        dispatch(removeAudio(journal))
      })
  }
}

function removeAudio(journal) {
  return { type: DELETE_AUDIO, payload: journal }
}

export function allVideos(arrayOfVideos) {
  return { type: ALL_VIDEOS, payload: arrayOfVideos }
}

export function addVideoToAllVideos(videoJournal) {
  return { type: ADD_VIDEO, payload: videoJournal }
}

export function deleteVideo(journal) {
  return (dispatch) => {
    return fetch(`http://localhost:3000/video_entries/${journal.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("deleted video journal:", data)
        dispatch(removeVideo(journal))
      })
  }
}

function removeVideo(journal) {
  return { type: DELETE_VIDEO, payload: journal }
}
