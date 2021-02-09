/* global CY */

import React from "react"
import { connect } from "react-redux"
import Webcam from "react-webcam"
import { Grid, Header } from "semantic-ui-react"

let EMO_MAP = [
  { name: "Sleepy", x: 50, y: 0 },
  { name: "Tired", x: 50, y: 0 },
  {
    name: "Afraid",
    x: 44,
    y: 90,
  },
  { name: "Angry", x: 30, y: 90 },
  { name: "Calm", x: 87, y: 16 },
  { name: "Relaxed", x: 86, y: 18 },
  {
    name: "Content",
    x: 91,
    y: 23,
  },
  { name: "Depressed", x: 9, y: 26 },
  { name: "Discontent", x: 16, y: 34 },
  {
    name: "Determined",
    x: 87,
    y: 63,
  },
  { name: "Happy", x: 95, y: 59 },
  { name: "Anxious", x: 17, y: 12 },
  { name: "Good", x: 95, y: 46 },
  {
    name: "Pensive",
    x: 52,
    y: 20,
  },
  { name: "Impressed", x: 70, y: 47 },
  { name: "Frustrated", x: 20, y: 70 },
  {
    name: "Disappointed",
    x: 10,
    y: 49,
  },
  { name: "Bored", x: 33, y: 11 },
  { name: "Annoyed", x: 28, y: 88 },
  { name: "Enraged", x: 41, y: 92 },
  {
    name: "Excited",
    x: 85,
    y: 86,
  },
  { name: "Melancholy", x: 48, y: 18 },
  { name: "Satisfied", x: 89, y: 19 },
  {
    name: "Distressed",
    x: 15,
    y: 78,
  },
  { name: "Uncomfortable", x: 16, y: 32 },
  { name: "Worried", x: 47, y: 34 },
  {
    name: "Amused",
    x: 78,
    y: 60,
  },
  { name: "Apathetic", x: 40, y: 44 },
  { name: "Peaceful", x: 78, y: 10 },
  {
    name: "Contemplative",
    x: 79,
    y: 20,
  },
  { name: "Embarrassed", x: 35, y: 20 },
  { name: "Sad", x: 9, y: 30 },
  { name: "Hopeful", x: 81, y: 35 },
  {
    name: "Pleased",
    x: 95,
    y: 45,
  },
]

class FunWithEmotionsPage extends React.Component {
  state = {
    emo: "",
    arousal: "",
    valence: "",
  }
  componentDidMount() {
    CY.loader()
      .licenseKey(process.env.sdkLicense)
      // .addModule(CY.modules().FACE_EMOTION.name)
      .addModule(CY.modules().FACE_AROUSAL_VALENCE.name)
      .load()
      .then(({ start, stop }) => {
        start()
        this.stopSDK = stop
      })

    // window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
    //   this.setState({
    //     emo: evt.detail.output.dominantEmotion,
    //   })
    // })
    window.addEventListener(
      CY.modules().FACE_AROUSAL_VALENCE.eventName,
      (evt) => {
        // console.log("Face arousal valence result", evt.detail)
        this.setState({
          arousal: evt.detail.output.arousalvalence.arousal,
          valence: evt.detail.output.arousalvalence.valence,
        })
        let arousal = evt.detail.output.arousalvalence.arousal
        let valence = evt.detail.output.arousalvalence.valence
        this.calculateCoordinates(arousal, valence)
      }
    )
  }

  componentWillUnmount() {
    this.stopSDK()
  }

  calculateCoordinates = (arousal, valence) => {
    arousal *= 4
    valence *= 3
    let x = Math.max(-1, Math.min(valence, 1))
    let y = Math.max(-1, Math.min(arousal, 1))
    let u = (x * Math.sqrt(1 - (y * y) / 2) + 1) * 50
    let v = (y * Math.sqrt(1 - (x * x) / 2) + 1) * 50
    console.log("X value: ", u)
    console.log("Y value: ", v)
    return { x: u, y: v }
  }

  render() {
    console.log("state: ", this.state)
    const videoConstraints = {
      facingMode: "user",
    }

    return (
      <>
        {!this.props.parent && this.props.child ? (
          <>
            <Header
              className="h1"
              size="huge"
              textAlign="center"
              style={{ color: "rgb(171, 218, 225)" }}
            >
              Let's make some funny faces, {this.props.child.username}!
            </Header>
            <Grid centered style={{ margin: "50px" }}>
              <Webcam
                style={{ height: "620px", width: "800px" }}
                videoConstraints={videoConstraints}
              />
            </Grid>
            <Header
              className="h1"
              size="huge"
              textAlign="center"
              style={{ color: "rgb(171, 218, 225)" }}
            >
              {this.state.emo ? this.state.emo : null}
            </Header>
            <div style={{ dispaly: "block", height: "300px" }} />
          </>
        ) : null}
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
    parent: state.parent,
  }
}

export default connect(mapStateToProps)(FunWithEmotionsPage)
