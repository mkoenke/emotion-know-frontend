import React from "react"
import { connect } from "react-redux"
import VideoRecorder from "react-video-recorder"
import { Button, Form, Grid, Header } from "semantic-ui-react"

class RecordView extends React.Component {
  state = {
    //mediaBlob: null,
    ////
    title: "",
    submittedTitle: "",
    videoBlob: null,
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
            <div style={{ height: "620px", width: "800px" }}>
              <VideoRecorder
                showReplayControls={true}
                replayVideoAutoplayAndLoopOff={true}
                onRecordingComplete={(videoBlob) => {
                  this.setState({ videoBlob })
                }}
              />
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
