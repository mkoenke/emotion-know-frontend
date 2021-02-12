/* global CY */
import React from "react"
import { Route, Switch } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import "./App.css"
import NavBar from "./Components/NavBar"
import AudioGalleryPage from "./Containers/AudioGalleryPage"
import VoiceRecorderPage from "./Containers/AudioJournalPage"
import FunWithEmotionsPage from "./Containers/FunWithEmotionsPage"
import Homepage from "./Containers/Homepage"
import ReportGalleryPage from "./Containers/ReportGalleryPage"
import ResourcesPage from "./Containers/ResourcesPage"
import VideoGalleryPage from "./Containers/VideoGalleryPage"
import CameraPage from "./Containers/VideoJournalPage"
import WelcomePageContainer from "./Containers/WelcomePageContainer"
import WrittenJournalGallery from "./Containers/WrittenJournalGallery"
import WritingPage from "./Containers/WrittenJournalPage"

// CY.loader()
//   .licenseKey(process.env.sdkLicense)
//   .addModule(CY.modules().FACE_EMOTION.name)
//   .addModule(CY.modules().FACE_AROUSAL_VALENCE.name)
//   .load()
//   .then(({ start, stop }) => {

//   })

function App() {
  return (
    <>
      <NavBar />

      <Switch>
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/welcome" component={WelcomePageContainer} />
        <Route path="/webcam" component={CameraPage} />
        <Route path="/write" component={WritingPage} />
        <Route path="/journals" component={WrittenJournalGallery} />
        <Route path="/audios" component={AudioGalleryPage} />
        <Route path="/audio" component={VoiceRecorderPage} />
        <Route path="/videos" component={VideoGalleryPage} />
        <Route path="/reports" component={ReportGalleryPage} />
        <Route path="/fun" component={FunWithEmotionsPage} />
        <Route path="/" component={Homepage} />
      </Switch>
    </>
  )
}
export default App
