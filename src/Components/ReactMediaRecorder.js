import ReactMediaRecorder from "@getapper/react-media-recorder"
import React from "react"

class RecordView extends React.Component {
  state = {
    mediaBlob: null,
  }
  render() {
    return (
      <div>
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
              <p>{status}</p>
              <button onClick={startRecording}>Start Recording</button>
              <button onClick={stopRecording}>Stop Recording</button>
              <video heigh="820" width="820" src={mediaUrl} controls autoplay />
            </div>
          )}
        />
      </div>
    )
  }
}

export default RecordView
