import React from "react"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone

// import React, { useEffect } from "react"
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition"
// // import "./speech-to-text.css"

// const SpeechToText = () => {
//   const { transcript, resetTranscript } = useSpeechRecognition()
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     alert(e.target.text.value)
//   }
//   useEffect(() => {
//     SpeechRecognition.startListening({ continuous: true })
//     console.log("Now listening...")
//     return () => {
//       SpeechRecognition.stopListening()
//       console.log("Stopped Listening")
//     }
//   }, [])
//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     alert("Browser does not support speech recognition")
//   }
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <textarea name="text" rows={10} cols={50} value={transcript}></textarea>
//         <div className="btn-container">
//           <span onClick={resetTranscript} className="btn">
//             Clear Text
//           </span>
//           <button type="submit" className="btn">
//             Print Text
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default SpeechToText
