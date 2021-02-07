import useMediaRecorder from "@wmik/use-media-recorder"
import React from "react"

function Player({ srcBlob, audio }) {
  if (!srcBlob) {
    return null
  }

  if (audio) {
    return <audio src={URL.createObjectURL(srcBlob)} controls />
  }

  return (
    <video
      src={URL.createObjectURL(srcBlob)}
      width={520}
      height={480}
      controls
    />
  )
}

function LiveStreamPreview({ stream }) {
  let videoPreviewRef = React.useRef()

  React.useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream
    }
  }, [stream])

  if (!stream) {
    return null
  }

  return (
    <video id="video" ref={videoPreviewRef} width={520} height={480} autoPlay />
  )
}

export default function MediaRecorder(props) {
  let {
    status,
    liveStream,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    clearMediaStream,
  } = useMediaRecorder({
    mediaStreamConstraints: { audio: true, video: true },
  })

  //eslint-disable-next-line
  React.useEffect(() => clearMediaStream, [])

  return (
    <article>
      <dialog open={status === "acquiring_media"}>
        Waiting for permissions
      </dialog>

      <section>
        {status !== "recording" && (
          <button
            type="button"
            onClick={async () => {
              await getMediaStream()
              startRecording()
              props.onStartRecording()
            }}
          >
            Start recording
          </button>
        )}
        {status === "recording" && (
          <button type="button" onClick={stopRecording}>
            Stop recording
          </button>
        )}
      </section>
      <LiveStreamPreview stream={liveStream} />
      <Player srcBlob={mediaBlob} />
    </article>
  )
}
