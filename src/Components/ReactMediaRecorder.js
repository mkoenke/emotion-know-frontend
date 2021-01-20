import ReactMediaRecorder from "@getapper/react-media-recorder"
import React from "react"
import { Button, Grid } from "semantic-ui-react"

class RecordView extends React.Component {
  state = {
    mediaBlob: null,
  }
  render() {
    return (
      <div>
        <Grid centered>
          <br />
          <ReactMediaRecorder
            video
            //   whenStopped={(mediaUrl) => } save mediaBlob in state, post to db, send to sentiment API and save response in state and database
            render={({
              status,
              startRecording,
              stopRecording,
              mediaBlob,
              mediaUrl,
            }) => (
              <div>
                {/* <p>{status}</p> */}
                <video
                  height="620"
                  width="820"
                  src={mediaUrl}
                  controls
                  autoplay
                />
                <br />
                <Button onClick={startRecording}>Start Recording</Button>
                <Button onClick={stopRecording}>Stop Recording</Button>
              </div>
            )}
          />
        </Grid>
      </div>
    )
  }
}

export default RecordView
