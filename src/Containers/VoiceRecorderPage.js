// import MicRecorder from "mic-recorder-to-mp3"
// const Mp3Recorder = new MicRecorder({ bitRate: 128 })
import AudioReactRecorder, { RecordState } from "audio-react-recorder"
import React from "react"
import { connect } from "react-redux"
// import { Recorder } from "react-voice-recorder"
import "react-voice-recorder/dist/index.css"
import { Form, Grid, Header } from "semantic-ui-react"
// import SpeechRecognition from "../Components/SpeechRecogition"
import SpeechTranscriber from "../Components/SpeechTranscriber"
import { postJournal } from "../Redux/actions"

class VoiceRecorderPage extends React.Component {
  state = {
    title: "",
    submittedTitle: "",
    recordState: null,
    blobUrl: null,
    blob: null,
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

  //audioData contains blob and blobUrl
  onStop = (audioData) => {
    console.log("audioData", audioData)

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
          <div>
            <AudioReactRecorder state={recordState} onStop={this.onStop} />

            <button onClick={this.start}>Start</button>
            <button onClick={this.stop}>Stop</button>
          </div>
          {this.state.blobUrl ? (
            <>
              <audio src={this.state.blobUrl} controls />
              <button onClick={this.handleUploadClick}>Upload</button>
            </>
          ) : null}

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
