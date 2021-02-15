import AudioReactRecorder, { RecordState } from "audio-react-recorder"
import emailjs from "emailjs-com"
import React from "react"
import { connect } from "react-redux"
import { Button, Form, Grid, Header, Popup } from "semantic-ui-react"
import { addAudioToAllAudio, addReportToAllReports } from "../Redux/actions"

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = "en-US"

class VoiceRecorderPage extends React.Component {
  state = {
    title: "",
    submittedTitle: "",
    recordState: null,
    blobUrl: null,
    blob: null,
    listening: false,
    finalTranscript: "",
  }
  componentWillUnmount() {
    ///not hitting here
    console.log("here")
    this.stop()
    this.stopListen()
  }

  changeHandler = (e) => {
    this.setState({ finalTranscript: e.value })
  }

  startListen = () => {
    this.setState(
      {
        listening: true,
      },
      this.handleListen
    )
    // setTimeout(this.start(), 5000)
  }

  stopListen = () => {
    this.setState(
      {
        listening: false,
      },
      this.handleListen
    )
  }

  handleListen = () => {
    console.log("listening?", this.state.listening)

    if (this.state.listening) {
      recognition.start()
      recognition.onend = () => {
        console.log("...continue listening...")
        recognition.start()
      }
    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log("Stopped listening per click")
      }
    }
    recognition.onstart = () => {
      console.log("Listening!")
    }

    let finalTranscript = ""
    recognition.onresult = (event) => {
      let interimTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) finalTranscript += transcript + " "
        else interimTranscript += transcript
      }
      document.getElementById("interim").innerHTML = interimTranscript
      document.getElementById("final").innerHTML = finalTranscript
      this.setState({ finalTranscript: finalTranscript })

      const transcriptArr = finalTranscript.split(" ")
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log("stopCmd", stopCmd)

      if (stopCmd[0] === "stop" && stopCmd[1] === "listening") {
        this.setState({ listening: false }, this.stop)
        recognition.stop()
        recognition.onend = () => {
          console.log("Stopped listening per command")
          const finalText = transcriptArr.slice(0, -3).join(" ")
          document.getElementById("final").innerHTML = finalText
        }
      }
    }

    recognition.onerror = (event) => {
      console.log("Error occurred in recognition: " + event.error)
    }
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

  handleAudioUpload(file) {
    const journal = new FormData()
    journal.append("title", this.state.submittedTitle)
    journal.append("child_id", this.props.child.id)
    journal.append("content", this.state.finalTranscript)
    journal.append("clip", file, `${this.state.submittedTitle}`)

    for (let value of journal.values()) {
      console.log(value)
    }

    fetch("http://localhost:3000/audio_entries", {
      method: "POST",
      body: journal,
    })
      .then((resp) => resp.json())
      .then((journal) => {
        console.log("returned audio journal:", journal)
        this.props.dispatchAudio(journal)
        this.sendEmail()
        this.props.dispatchReport(journal.audio_report)
        this.props.history.push("/audios")
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

  start = () => {
    this.setState({
      recordState: RecordState.START,
    })
  }

  stop = () => {
    this.setState({
      recordState: RecordState.STOP,
    })
  }

  onStop = (audioData) => {
    this.setState({ blobUrl: audioData.url, blob: audioData.blob })
  }

  handleUploadClick = () => {
    this.handleAudioUpload(this.state.blob)
  }

  render() {
    console.log("state in audio recorder: ", this.state)
    const { recordState } = this.state
    return (
      <>
        <div className="pattern">
          {this.props.child ? (
            <Header
              className="pageHeader"
              size="huge"
              textAlign="center"
              style={{ color: "rgb(171, 218, 225)", margin: "50px" }}
            >
              How are you feeling today, {this.props.child.username}?
            </Header>
          ) : null}

          <div className="journal audioJournal">
            {this.state.submittedTitle ? (
              <Header as="h1" className="content" textAlign="center">
                {this.state.submittedTitle}
              </Header>
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
                  <Form.Button>Set Title</Form.Button>
                </Form>
              </Grid>
            )}
            <div className="recorderContainer">
              <div>
                {this.state.listening ? (
                  <>
                    <Header className="content extraLarge">GO!</Header>
                    <Header className="content">
                      When you are finished, just say "Stop Listening!"
                    </Header>
                  </>
                ) : null}
                <AudioReactRecorder state={recordState} onStop={this.onStop} />
              </div>
              <div className="audioContainer">
                <Popup
                  content='Now Pess "Get Set!"'
                  on="click"
                  pinned
                  size="huge"
                  trigger={
                    <Button className="audioButton" onClick={this.start}>
                      Get Ready!
                    </Button>
                  }
                />

                <Button className="audioButton" onClick={this.startListen}>
                  Get Set!
                </Button>
              </div>
              {/* <div className="audioContainer"> */}
              {/* <Header size="medium" style={{ color: "rgb(171, 218, 225)" }}>
                  Just say "Stop Listening!" when you are finished
                </Header> */}
              {/* <Button onClick={this.stop}>Stop Recording</Button> */}
              {/* <Button onClick={this.stopListen}>Stop Listening</Button> */}
              {/* </div> */}
            </div>
            {this.state.blobUrl ? (
              <div className="audioContainer">
                <Header>Replay Before Upload</Header>
                <audio src={this.state.blobUrl} controls />
                <Button onClick={this.handleUploadClick}>Upload</Button>
              </div>
            ) : null}

            <div className="audioContainer">
              <div id="interim" className="interim"></div>
              <div id="final" className="final"></div>
            </div>
          </div>
          <div className="footer"></div>
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
    dispatchAudio: (journal) => dispatch(addAudioToAllAudio(journal)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoiceRecorderPage)
