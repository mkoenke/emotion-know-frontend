import React from "react"
import { connect } from "react-redux"
import { Recorder } from "react-voice-recorder"
import "react-voice-recorder/dist/index.css"
import { Form, Grid, Header } from "semantic-ui-react"

class VoiceRecorderPage extends React.Component {
  state = {
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
    console.log(file)
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
            <Form.Button>Set Title</Form.Button>
          </Form>
        </Grid>
        <Recorder
          record={true}
          title={this.state.submittedTitle}
          audioURL={this.state.audioDetails.url}
          showUIAudio
          handleAudioStop={(data) => this.handleAudioStop(data)}
          handleAudioUpload={(data) => this.handleAudioUpload(data)}
          handleRest={() => this.handleRest()}
        />
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
  }
}

export default connect(mapStateToProps)(VoiceRecorderPage)
