import {
  ADD_AUDIO,
  ADD_JOURNAL,
  ADD_VIDEO,
  ALL_AUDIOS,
  ALL_JOURNALS,
  ALL_REPORTS,
  ALL_VIDEOS,
  DELETE_AUDIO,
  DELETE_JOURNAL,
  DELETE_VIDEO,
  LOGOUT,
  PARENTS_REPORTS,
  SET_CHILD,
  SET_ERROR,
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
        if (!data.error) {
          console.log("data:", data)
          localStorage.setItem("token", data.jwt)

          dispatch(setChild(data.child))
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
        console.log("data:", data)
        localStorage.setItem("token", data.jwt)
        dispatch(setParent(data.parent))
        dispatch(setChild(data.parent.child))
        dispatch(
          parentsReports(
            data.parent.reports,
            data.parent.audio_reports,
            data.parent.video_reports
          )
        )
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
  console.log("CHILD: ", child)
  return (dispatch) => {
    return fetch(`http://localhost:3000/children/${child.id}/reports`)
      .then((resp) => resp.json())
      .then((childData) => {
        console.log("child data with reports:", childData)
        // dispatch(setChild(childData))

        // // dispatch(setReport())
        // let arrayOfJournals = childData.journal_entries
        // let arrayOfAudios = childData.audio_entries
        // dispatch(allReports(arrayOfJournals, arrayOfAudios))
      })
  }
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

// export function setReport(report) {
//   return { type: SET_REPORT, payload: report }
// }
