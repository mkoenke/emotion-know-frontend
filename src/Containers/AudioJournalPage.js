import AudioReactRecorder, { RecordState } from "audio-react-recorder"
import React from "react"
import { connect } from "react-redux"
// import "react-voice-recorder/dist/index.css"
import { Button, Form, Grid, Header } from "semantic-ui-react"
import { addReportToAllReports } from "../Redux/actions"

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

        this.props.dispatchReport(journal.audio_report)
        this.props.history.push("/audios")
      })

    // this.setState({ title: "", content: "" })
    // /// redirect to audio journal gallery
    // /// fetch child again and set reports in state
    // this.props.dispatchReports(this.props.child)
  }

  start = () => {
    // this.startListen()
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
        {this.props.child ? (
          <Header
            className="h1"
            size="huge"
            textAlign="center"
            style={{ color: "rgb(171, 218, 225)", margin: "50px" }}
          >
            How are you feeling today, {this.props.child.username}?
          </Header>
        ) : null}

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
        <div style={recorderContainer}>
          <AudioReactRecorder state={recordState} onStop={this.onStop} />
          <div style={container}>
            <Button onClick={this.start}>Start Recording</Button>
            <Button onClick={this.startListen}>Start Listening</Button>
          </div>
          <div style={container}>
            <Button onClick={this.stop}>Stop Recording</Button>
            <Button onClick={this.stopListen}>Stop Listening</Button>
          </div>
        </div>
        {this.state.blobUrl ? (
          <div style={container}>
            <Header>Replay Before Upload</Header>
            <audio src={this.state.blobUrl} controls />
            <Button onClick={this.handleUploadClick}>Upload</Button>
          </div>
        ) : null}

        <div style={container}>
          <div id="interim" style={interim}></div>
          <div id="final" style={final}></div>
          {/* <textarea
            onChange={this.changeHandler}
            value={this.state.finalTranscript}
          >
          </textarea> */}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoiceRecorderPage)

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    margin: "10px",
  },
  recorderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    margin: "50px",
    border: "#ccc 1px solid",
  },
  interim: {
    color: "gray",
    border: "#ccc 1px solid",
    padding: "1em",
    margin: "1em",
    width: "300px",
  },
  final: {
    color: "black",
    border: "#ccc 1px solid",
    padding: "1em",
    margin: "1em",
    width: "300px",
  },
}

const { container, interim, final, recorderContainer } = styles
