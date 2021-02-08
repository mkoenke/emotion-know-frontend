/* global CY */

import emailjs from "emailjs-com"
import React from "react"
import { connect } from "react-redux"
import { Button, Form, Grid, Header } from "semantic-ui-react"
import { addReportToAllReports, addVideoToAllVideos } from "../Redux/actions"
import Video from "./VideoRecorder"

// import { ReactMediaRecorder } from "react-media-recorder"
// import MediaRecorder from "./HoldComponents/UseMediaRecorder"

let angerData = []
let fearData = []
let joyData = []
let surpriseData = []
let disgustData = []
let sadnessData = []

class RecordView extends React.Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     title: "",
  //     submittedTitle: "",
  //     videoBlob: null,
  //     emo: "",
  //     emoData: "",
  //     isRecording: false,
  //     angerAvg: "",
  //     fearAvg: "",
  //     joyAvg: "",
  //     surpriseAvg: "",
  //     disgustAvg: "",
  //     sadnessAvg: "",
  //   }
  //   CY.loader()
  //     .licenseKey(process.env.sdkLicense)
  //     .addModule(CY.modules().FACE_EMOTION.name)
  //     .load()
  //     .then(({ start, stop }) => start())
  // }
  state = {
    title: "",
    submittedTitle: "",
    videoBlob: null,
    emo: "",
    emoData: "",
    isRecording: false,
    angerAvg: "",
    fearAvg: "",
    joyAvg: "",
    surpriseAvg: "",
    disgustAvg: "",
    sadnessAvg: "",
  }

  componentDidMount() {
    let source = CY.getUserMediaCameraFactory().createCamera({
      video: document.getElementById("video"),
    })

    CY.loader()
      .licenseKey(process.env.sdkLicense)
      .addModule(CY.modules().FACE_EMOTION.name)
      .source(source)
      .load()
      .then(({ start, stop }) => start())
  }

  componentWillUnmount() {
    //stop or terminate SDK
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleTitleSubmit = () => {
    this.setState(
      { submittedTitle: this.state.title },
      this.setState({ title: "" })
    )
  }
  handleUploadClick = () => {
    this.handleVideoUpload(this.state.videoBlob)
  }

  handleVideoUpload = (file) => {
    const journal = new FormData()
    journal.append("title", this.state.submittedTitle)
    journal.append("child_id", this.props.child.id)
    journal.append("video", file, `${this.state.submittedTitle}`)

    fetch("http://localhost:3000/video_entries", {
      method: "POST",
      body: journal,
    })
      .then((resp) => resp.json())
      .then((returnedVideoJournal) => {
        console.log("returned video journal:", returnedVideoJournal)
        this.props.dispatchVideo(returnedVideoJournal)
        this.postReport(returnedVideoJournal)
        this.sendEmail()
        this.props.history.push("/videos")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  sendEmail = () => {
    emailjs
      .send(
        "service_b4uxd6p",
        "template_skc2xnu",
        {
          parentEmail: this.props.child.parent_email,
          replyEmail: "EmotionKnowTeam@gmail.com",
        },
        "user_CN4ma3aQ7rwUtwDJc9mdp"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text)
        },
        function (error) {
          console.log("FAILED...", error)
        }
      )
  }

  postReport = (journal) => {
    let reportToPost = {
      title: this.state.submittedTitle,
      video_entry_id: journal.id,
      child_id: this.props.child.id,
      parent_id: this.props.child.parent.id,
      anger: this.state.angerAvg,
      disgust: this.state.disgustAvg,
      fear: this.state.fearAvg,
      joy: this.state.joyAvg,
      sadness: this.state.sadnessAvg,
      surprise: this.state.surpriseAvg,
    }

    console.log("Report before post: ", reportToPost)
    return fetch("http://localhost:3000/video_reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(reportToPost),
    })
      .then((resp) => resp.json())
      .then((returnedReport) => {
        console.log("returned video report:", returnedReport)
        this.props.dispatchReport(returnedReport)
      })
  }

  getAverages = () => {
    const average = (arr) => arr.reduce((sume, el) => sume + el, 0) / arr.length

    let angerAvg = average(angerData)
    let fearAvg = average(fearData)
    let disgustAvg = average(disgustData)
    let joyAvg = average(joyData)
    let sadnessAvg = average(sadnessData)
    let surpriseAvg = average(surpriseData)
    this.setState({
      angerAvg,
      fearAvg,
      disgustAvg,
      joyAvg,
      sadnessAvg,
      surpriseAvg,
    })
  }

  onRecordingComplete = (videoBlob) => {
    this.setState({ videoBlob, isRecording: false }, this.getAverages)
  }
  onStartRecording = () => {
    this.setState({ isRecording: true }, this.startSDK)
  }

  startSDK = () => {
    window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
      this.setState({
        emo: evt.detail.output.dominantEmotion,
        emoData: evt.detail.output.rawEmotion,
      })
      if (this.state.isRecording) {
        this.collectEmotionData(evt.detail.output.rawEmotion)
      }
    })
  }

  collectEmotionData = (emotionObj) => {
    angerData = [...angerData, emotionObj.Angry]
    fearData = [...fearData, emotionObj.Fear]
    disgustData = [...fearData, emotionObj.Disgust]
    joyData = [...fearData, emotionObj.Happy]
    sadnessData = [...fearData, emotionObj.Sad]
    surpriseData = [...fearData, emotionObj.Surprise]
  }

  render() {
    console.log("State: ", this.state)
    return (
      <>
        <div style={{ margin: "50px" }}>
          {this.state.submittedTitle ? (
            <Header textAlign="center">{this.state.submittedTitle}</Header>
          ) : (
            <Grid centered>
              <Form onSubmit={this.handleTitleSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    style={{ width: "300px" }}
                    fluid
                    placeholder="Title"
                    onChange={this.changeHandler}
                    name="title"
                    value={this.state.title}
                  />
                </Form.Group>
                <Form.Button>Set Video Journal Title</Form.Button>
              </Form>
            </Grid>
          )}
        </div>
        <div>
          <Grid centered>
            <div style={{ height: "620px", width: "800px" }}>
              <Video
                onRecordingComplete={this.onRecordingComplete}
                onStartRecording={this.onStartRecording}
                onTurnOnCamera={this.startSDK}
              />
              {/* <div>
                <ReactMediaRecorder
                  video
                  render={({
                    status,
                    startRecording,
                    stopRecording,
                    mediaBlobUrl,
                  }) => (
                    <div onClick={this.onStartRecording}>
                      <p>{status}</p>
                      <button onClick={startRecording}>Start Recording</button>
                      <button onClick={stopRecording}>Stop Recording</button>
                      <video
                        id="video"
                        src={mediaBlobUrl}
                        controls
                        autoplay
                        loop
                      />
                    </div>
                  )}
                />
              </div> */}
              {/* <MediaRecorder onStartRecording={this.onStartRecording} /> */}
            </div>
          </Grid>
          <div
            style={{
              margin: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button onClick={this.handleUploadClick}>Upload Video</Button>
          </div>
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchReport: (report) => dispatch(addReportToAllReports(report)),
    dispatchVideo: (journal) => dispatch(addVideoToAllVideos(journal)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordView)
