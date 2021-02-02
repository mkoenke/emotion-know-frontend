import emailjs from "emailjs-com"
import React from "react"
import { connect } from "react-redux"
import VideoRecorder from "react-video-recorder"
import { Button, Form, Grid, Header } from "semantic-ui-react"
// import { loadSDK } from "../../public/index.html"
let CY
class RecordView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      submittedTitle: "",
      videoBlob: null,
      emo: "",
    }
    CY.loader()
      .addModule(CY.modules().FACE_EMOTION.name)
      .load()
      .then(({ start, stop }) => start())

    window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
      this.setState({ emo: evt.detail.output.dominantEmotion })
    })
  }

  componentDidMount() {
    // const url = "https://ai-sdk.morphcast.com/v1.14/ai-sdk.js"
    // const script = document.createElement("script")
    // document.body.appendChild(script)
    // return new Promise((resolve, reject) => {
    //   script.onload = () => resolve(CY)
    //   script.onerror = reject
    //   script.src = url
    // }).then((CY) => {
    //   return (
    //     CY.loader()
    //       // .source(source)
    //       .addModule(CY.modules().FACE_AROUSAL_VALENCE.name)
    //       // .licenseKey('<KEY>')
    //       .load()
    //       .then((cmd) => {
    //         this.cmd = cmd
    //         cmd.start()
    //         window.addEventListener("CY_FACE_AROUSAL_VALENCE_RESULT", (e) =>
    //           this.TW.sendData(JSON.stringify(e.detail.output.arousalvalence))
    //         )
    //       })
    //   )
    // })
    // class ScriptLoader {
    //   static loadScript(url) {
    //     return new Promise((resolve) => {
    //       const script = document.createElement("script")
    //       script.type = "text/javascript"
    //       if (script.readyState) {
    //         //IE
    //         script.onreadystatechange = function () {
    //           if (
    //             script.readyState === "loaded" ||
    //             script.readyState === "complete"
    //           ) {
    //             script.onreadystatechange = null
    //             resolve()
    //           }
    //         }
    //       } else {
    //         //Others
    //         script.onload = function () {
    //           resolve()
    //         }
    //       }
    //       script.src = url
    //       document.getElementsByTagName("head")[0].appendChild(script)
    //     })
    //   }
    //   static downloadAiSDK() {
    //     if (ScriptLoader.p == null) {
    //       ScriptLoader.p = ScriptLoader.loadScript(
    //         "https://sdk.morphcast.com/mphtools/v1.0/mphtools.js"
    //       )
    //         .then(() =>
    //           ScriptLoader.loadScript(
    //             "https://ai-sdk.morphcast.com/v1.14/ai-sdk.js"
    //           )
    //         )
    //         .then(() => CY) // CY is a global var
    //     }
    //     return ScriptLoader.p
    //   }
    // }
    // ScriptLoader.downloadAiSDK().then((CY) => {
    //   // here, the local variable CY can be changed to everything else (eg. AI)
    //   CY.loader()
    //     .addModule(CY.modules().FACE_DETECTOR.name)
    //     .load()
    //     .then(({ start, stop }) => start())
    //   window.addEventListener(CY.modules().FACE_DETECTOR.eventName, (evt) => {
    //     console.log("Face detector result", evt.detail)
    //   })
    // })
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

    for (let value of journal.values()) {
      console.log(value)
    }

    fetch("http://localhost:3000/video_entries", {
      method: "POST",
      body: journal,
    })
      .then((response) => {
        return response.text()
      })
      .then((data) => {
        Promise.resolve(
          data
            ? JSON.parse(data) && console.log("returned video journal:", data)
            : {}
        )
        ///send email
        let templateParams = {
          to_name: this.props.child.parent_email,
          message:
            "Your child just created a journal entry!  Log in to see the emotions they expressed!",
          to_email: this.props.child.parent_email,
          reply_to: "emotionknowteam@gmail.com",
        }
        emailjs
          .sendForm(
            "service_b4uxd6p",
            "template_skc2xnu",
            templateParams,
            "user_CN4ma3aQ7rwUtwDJc9mdp"
          )
          .then(
            (result) => {
              console.log(result.text)
            },
            (error) => {
              console.log(error.text)
            }
          )
      })
      .catch((error) => {
        Promise.reject(error)
      })
    // .then((resp) => resp.json())
    // .then((data) => {
    //   console.log("returned video journal:", data)

    // dispatch(addJournalToAllJournals(data))
    //fetch reports
    // })
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
                <Form.Button>Set Audio Journal Title</Form.Button>
              </Form>
            </Grid>
          )}
        </div>
        <div>
          <Grid centered>
            <video
              id="sdkvideo"
              muted
              playsinline
              style={{ position: "absolute", width: "0px", height: "0px" }}
            ></video>
            <div style={{ height: "620px", width: "800px" }}>
              <VideoRecorder
                showReplayControls={true}
                replayVideoAutoplayAndLoopOff={true}
                onRecordingComplete={(videoBlob) => {
                  this.setState({ videoBlob })
                }}
              />

              <div></div>
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

export default connect(mapStateToProps)(RecordView)
