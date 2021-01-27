// import MicRecorder from "mic-recorder-to-mp3"
import React from "react"
import { connect } from "react-redux"
import { Recorder } from "react-voice-recorder"
import "react-voice-recorder/dist/index.css"
import { Form, Grid, Header } from "semantic-ui-react"
import SpeechRecognition from "../Components/SpeechRecogition"
import SpeechTranscriber from "../Components/SpeechTranscriber"
import { postJournal } from "../Redux/actions"
// const Mp3Recorder = new MicRecorder({ bitRate: 128 })

class VoiceRecorderPage extends React.Component {
  state = {
    // isRecording: false,
    // blobURL: "",
    // isBlocked: false,
    // blob: "",
    title: "",
    submittedTitle: "",
    audioDetails: {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    },
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
  handleAudioStop(data) {
    console.log(data)
    this.setState({ audioDetails: data })
  }

  handleAudioUpload(file) {
    const journal = new FormData()
    journal.append("title", this.state.submittedTitle)
    journal.append("child_id", this.props.child.id)
    journal.append("clip", file, `${this.state.submittedTitle}`)

    // console.log(journal)
    for (let value of journal.values()) {
      console.log(value)
    }
    // this.props.dispatchJournal(journal)
    fetch("http://localhost:3000/journal_entries", {
      method: "POST",
      body: journal,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("returned journal:", data)
        // dispatch(setJournal(data))
        // dispatch(addJournalToAllJournals(data))
      })
  }

  handleRest() {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    }
    this.setState({ audioDetails: reset })
  }
  //   start = () => {
  //     if (this.state.isBlocked) {
  //       console.log("Permission Denied")
  //     } else {
  //       Mp3Recorder.start()
  //         .then(() => {
  //           this.setState({ isRecording: true })
  //         })
  //         .catch((e) => console.error(e))
  //     }
  //   }

  //   stop = () => {
  //     Mp3Recorder.stop()
  //       .getMp3()
  //       .then(([buffer, blob]) => {
  //         const blobURL = URL.createObjectURL(blob)
  //         this.setState(
  //           { blobURL, blob, isRecording: false },
  //           this.handleAudioUpload(blob)
  //         )
  //       })
  //       .catch((e) => console.log(e))
  //   }

  //   componentDidMount() {
  //     navigator.getUserMedia(
  //       { audio: true },
  //       () => {
  //         console.log("Permission Granted")
  //         this.setState({ isBlocked: false })
  //       },
  //       () => {
  //         console.log("Permission Denied")
  //         this.setState({ isBlocked: true })
  //       }
  //     )
  //   }

  render() {
    console.log("state in audio recorder: ", this.state)
    return (
      <>
        {this.props.child ? (
          <Header
            className="h1"
            size="huge"
            textAlign="center"
            style={{ color: "rgb(171, 218, 225)" }}
          >
            How are you feeling today, {this.props.child.username}?
          </Header>
        ) : null}
        <br />
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
        <br />
        <div style={{ width: "600px", margin: "20px" }}>
          {/* <button onClick={this.start} disabled={this.state.isRecording}>
            Record
          </button>
          <button onClick={this.stop} disabled={!this.state.isRecording}>
            Stop
          </button>
          <audio src={this.state.blobURL} controls="controls" /> */}
          <SpeechRecognition />
          <Recorder
            record={true}
            title={this.state.submittedTitle}
            audioURL={this.state.audioDetails.url}
            showUIAudio
            handleAudioStop={(data) => this.handleAudioStop(data)}
            handleAudioUpload={(data) => this.handleAudioUpload(data)}
            handleRest={() => this.handleRest()}
          />
          <SpeechTranscriber />
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
    dispatchJournal: (journal) => dispatch(postJournal(journal)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoiceRecorderPage)
