// const url = "https://ai-sdk.morphcast.com/v1.14/ai-sdk.js"
// const script = document.createElement("script")
// document.body.appendChild(script)
// return new Promise((resolve, reject) => {
//   script.onload = () => resolve(CY)
//   script.onerror = reject
//   script.src = url
// }).then((CY) => {
//   return (
//     CY.loader()
//       // .source(source)
//       .addModule(CY.modules().FACE_AROUSAL_VALENCE.name)
//       // .licenseKey('<KEY>')
//       .load()
//       .then((cmd) => {
//         this.cmd = cmd
//         cmd.start()
//         window.addEventListener("CY_FACE_AROUSAL_VALENCE_RESULT", (e) =>
//           this.TW.sendData(JSON.stringify(e.detail.output.arousalvalence))
//         )
//       })
//   )
// })
// class ScriptLoader {
//   static loadScript(url) {
//     return new Promise((resolve) => {
//       const script = document.createElement("script")
//       script.type = "text/javascript"
//       if (script.readyState) {
//         //IE
//         script.onreadystatechange = function () {
//           if (
//             script.readyState === "loaded" ||
//             script.readyState === "complete"
//           ) {
//             script.onreadystatechange = null
//             resolve()
//           }
//         }
//       } else {
//         //Others
//         script.onload = function () {
//           resolve()
//         }
//       }
//       script.src = url
//       document.getElementsByTagName("head")[0].appendChild(script)
//     })
//   }
//   static downloadAiSDK() {
//     if (ScriptLoader.p == null) {
//       ScriptLoader.p = ScriptLoader.loadScript(
//         "https://sdk.morphcast.com/mphtools/v1.0/mphtools.js"
//       )
//         .then(() =>
//           ScriptLoader.loadScript(
//             "https://ai-sdk.morphcast.com/v1.14/ai-sdk.js"
//           )
//         )
//         .then(() => CY) // CY is a global var
//     }
//     return ScriptLoader.p
//   }
// }
// ScriptLoader.downloadAiSDK().then((CY) => {
//   // here, the local variable CY can be changed to everything else (eg. AI)
//   CY.loader()
//     .addModule(CY.modules().FACE_DETECTOR.name)
//     .load()
//     .then(({ start, stop }) => start())
//   window.addEventListener(CY.modules().FACE_DETECTOR.eventName, (evt) => {
//     console.log("Face detector result", evt.detail)
//   })
// })
