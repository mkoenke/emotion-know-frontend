import React from "react"
import { Route, Switch } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import "./App.css"
import NavBar from "./Components/NavBar"
import AudioGalleryPage from "./Containers/AudioGalleryPage"
import CameraPage from "./Containers/CameraPage"
import Homepage from "./Containers/Homepage"
import ReportGalleryPage from "./Containers/ReportGalleryPage"
import ResourcesPage from "./Containers/ResourcesPage"
import VideoGalleryPage from "./Containers/VideoGalleryPage"
import VoiceRecorderPage from "./Containers/VoiceRecorderPage"
import WelcomePageContainer from "./Containers/WelcomePageContainer"
import WritingPage from "./Containers/WritingPage"
import WrittenJournalGallery from "./Containers/WrittenJournalGallery"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emo: "",
      emoData: "",
    }
    // CY.loader()
    //   .addModule(CY.modules().FACE_EMOTION.name)
    //   .load()
    //   .then(({ start, stop }) => stop())

    // window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
    //   this.setState({
    //     emo: evt.detail.output.dominantEmotion,
    //     emoData: evt.detail.output.rawEmotion,
    //   })
    // })
  }
  render() {
    console.log(this.state)
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
          <Route path="/" component={Homepage} />
        </Switch>
      </>
    )
  }
}
export default App
