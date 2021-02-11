import React from "react"
import VideoRecorder from "react-video-recorder"

class Video extends React.Component {
  render() {
    return (
      <>
        <VideoRecorder
          showReplayControls={true}
          replayVideoAutoplayAndLoopOff={true}
          onRecordingComplete={this.props.onRecordingComplete}
          onStartRecording={this.props.onStartRecording}
          onTurnOnCamera={this.props.onTurnOnCamera}
        />
      </>
    )
  }
}

export default Video
