import { Route, Switch } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import "./App.css"
import NavBar from "./Components/NavBar"
import CameraPage from "./Containers/CameraPage"
import Homepage from "./Containers/Homepage"
import ReportGalleryPage from "./Containers/ReportGalleryPage"
import VideoGalleryPage from "./Containers/VideoGalleryPage"
import WelcomePageContainer from "./Containers/WelcomePageContainer"

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/welcome" component={WelcomePageContainer} />
        <Route path="/webcam" component={CameraPage} />
        <Route path="/videos" component={VideoGalleryPage} />
        <Route path="/reports" component={ReportGalleryPage} />
        <Route path="/" component={Homepage} />
      </Switch>
    </>
  )
}

export default App
