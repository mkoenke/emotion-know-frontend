// function loadSDK() {
// const customSource = CY.createSource.fromVideoElement(document.getElementById("sdkvideo"))

// CY.loader()
//   // .source(customSource)
//   .addModule(CY.modules().FACE_DETECTOR.name)
//   .addModule(CY.modules().FACE_EMOTION.name)

//   .load()
//   .then(({ start, stop }) => start())

// window.addEventListener(CY.modules().FACE_DETECTOR.eventName, (evt) => {
//   // console.log('Face detector result', evt.detail);
// })
// window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
//   console.log("Emotion result", evt.detail.output.dominantEmotion)
//   console.log("Emotion result", evt.detail.output.rawEmotion)
// })
// const FACE_EMOTION_EVENT = {
//   output: {
//     dominantEmotion: String,
//     emotion: {
//       Angry: Number,
//       Disgust: Number,
//       Fear: Number,
//       Happy: Number,
//       Neutral: Number,
//       Sad: Number,
//       Surprise: Number,
//     },
//   },
// }

// }
