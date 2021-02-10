/* global CY */

import React from "react"
import { connect } from "react-redux"
import Webcam from "react-webcam"
import { Grid, Header } from "semantic-ui-react"

class FunWithEmotionsPage extends React.Component {
  state = {
    emo: "",
    arousal: "",
    valence: "",
    mood: "",
    anger: "",
    disgust: "",
    fear: "",
    joy: "",
    sadness: "",
    surprise: "",
  }
  componentDidMount() {
    CY.loader()
      .licenseKey(process.env.sdkLicense)
      .addModule(CY.modules().FACE_EMOTION.name)
      .addModule(CY.modules().FACE_AROUSAL_VALENCE.name)
      .load()
      .then(({ start, stop }) => {
        start()
        this.stopSDK = stop
      })

    window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
      this.setState({
        emo: evt.detail.output.dominantEmotion,
      })
    })
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
        // this.calculateCoordinates(arousal, valence)
        this.findEmotion(arousal, valence)
      }
    )
  }

  componentWillUnmount() {
    this.stopSDK()
  }

  findEmotion = (valence, arousal) => {
    console.log("Finding emotions:")
    if (
      valence <= 0.11 &&
      valence >= -0.09 &&
      arousal <= -0.9 &&
      arousal >= -1.1
    ) {
      this.setState({ mood: "Sleepy and Tired" })
    } else if (
      valence <= -0.02 &&
      valence >= -0.22 &&
      arousal <= 0.89 &&
      arousal >= 0.69
    ) {
      this.setState({ mood: "Afraid" })
    } else if (
      valence <= -0.3 &&
      valence >= -0.5 &&
      arousal <= 0.89 &&
      arousal >= 0.69
    ) {
      this.setState({ mood: "Angry" })
    } else if (
      valence <= 0.88 &&
      valence >= 0.68 &&
      arousal <= -0.58 &&
      arousal >= -0.78
    ) {
      this.setState({ mood: "Calm" })
    } else if (
      valence <= 0.81 &&
      valence >= 0.61 &&
      arousal <= -0.55 &&
      arousal >= -0.75
    ) {
      this.setState({ mood: "Relaxed" })
    } else if (
      valence <= 0.91 &&
      valence >= 0.71 &&
      arousal <= -0.45 &&
      arousal >= -0.65
    ) {
      this.setState({ mood: "Content" })
    } else if (
      valence <= -0.71 &&
      valence >= -0.91 &&
      arousal <= -0.38 &&
      arousal >= -0.58
    ) {
      this.setState({ mood: "Depressed" })
    } else if (
      valence <= -0.58 &&
      valence >= -0.78 &&
      arousal <= -0.22 &&
      arousal >= -0.42
    ) {
      this.setState({ mood: "Discontent" })
    } else if (
      valence <= 0.83 &&
      valence >= 0.63 &&
      arousal <= 0.36 &&
      arousal >= 0.16
    ) {
      this.setState({ mood: "Determined" })
    } else if (
      valence <= 0.99 &&
      valence >= 0.79 &&
      arousal <= 0.27 &&
      arousal >= 0.07
    ) {
      this.setState({ mood: "Happy" })
    } else if (
      valence <= -0.62 &&
      valence >= -0.82 &&
      arousal <= -0.7 &&
      arousal >= -0.9
    ) {
      this.setState({ mood: "Anxious" })
    } else if (
      valence <= 1 &&
      valence >= 0.8 &&
      arousal <= 0.02 &&
      arousal >= -0.18
    ) {
      this.setState({ mood: "Good" })
    } else if (
      valence <= 0.13 &&
      valence >= -0.07 &&
      arousal <= -0.5 &&
      arousal >= -0.7
    ) {
      this.setState({ mood: "Pensive" })
    } else if (
      valence <= 0.49 &&
      valence >= 0.29 &&
      arousal <= 0.04 &&
      arousal >= -0.16
    ) {
      this.setState({ mood: "Impressed" })
    } else if (
      valence <= -0.5 &&
      valence >= -0.7 &&
      arousal <= 0.5 &&
      arousal >= 0.3
    ) {
      this.setState({ mood: "Frustrated" })
    } else if (
      valence <= -0.7 &&
      valence >= -0.9 &&
      arousal <= 0.07 &&
      arousal >= -0.13
    ) {
      this.setState({ mood: "Disapointed" })
    } else if (
      valence <= -0.25 &&
      valence >= -0.45 &&
      arousal <= -0.68 &&
      arousal >= -0.88
    ) {
      this.setState({ mood: "Bored" })
    } else if (
      valence <= -0.34 &&
      valence >= -0.54 &&
      arousal <= 0.86 &&
      arousal >= 0.66
    ) {
      this.setState({ mood: "Annoyed" })
    } else if (
      valence <= -0.08 &&
      valence >= -0.28 &&
      arousal <= 0.93 &&
      arousal >= 0.73
    ) {
      this.setState({ mood: "Enraged" })
    } else if (
      valence <= 0.8 &&
      valence >= 0.6 &&
      arousal <= 0.81 &&
      arousal >= 0.61
    ) {
      this.setState({ mood: "Excited" })
    } else if (
      valence <= 0.05 &&
      valence >= -0.15 &&
      arousal <= -0.55 &&
      arousal >= -0.75
    ) {
      this.setState({ mood: "Melancholy" })
    } else if (
      valence <= 0.87 &&
      valence >= 0.67 &&
      arousal <= -0.53 &&
      arousal >= -0.73
    ) {
      this.setState({ mood: "Satisfied" })
    } else if (
      valence <= -0.61 &&
      valence >= -0.81 &&
      arousal <= 0.65 &&
      arousal >= 0.45
    ) {
      this.setState({ mood: "Distressed" })
    } else if (
      valence <= -0.58 &&
      valence >= -0.78 &&
      arousal <= -0.27 &&
      arousal >= -0.47
    ) {
      this.setState({ mood: "Uncomfortable" })
    } else if (
      valence <= 0.03 &&
      valence >= -0.17 &&
      arousal <= -0.22 &&
      arousal >= -0.42
    ) {
      this.setState({ mood: "Worried" })
    } else if (
      valence <= 0.65 &&
      valence >= 0.45 &&
      arousal <= 0.29 &&
      arousal >= 0.09
    ) {
      this.setState({ mood: "Amused" })
    } else if (
      valence <= -0.1 &&
      valence >= -0.3 &&
      arousal <= -0.02 &&
      arousal >= -0.22
    ) {
      this.setState({ mood: "Apathetic" })
    } else if (
      valence <= 0.65 &&
      valence >= 0.45 &&
      arousal <= -0.7 &&
      arousal >= -0.9
    ) {
      this.setState({ mood: "Peaceful" })
    } else if (
      valence <= 0.68 &&
      valence >= 0.48 &&
      arousal <= -0.5 &&
      arousal >= -0.7
    ) {
      this.setState({ mood: "Contemplative" })
    } else if (
      valence <= -0.21 &&
      valence >= -0.41 &&
      arousal <= -0.5 &&
      arousal >= -0.7
    ) {
      this.setState({ mood: "Embarrassed" })
    } else if (
      valence <= -0.71 &&
      valence >= -0.91 &&
      arousal <= -0.3 &&
      arousal >= -0.5
    ) {
      this.setState({ mood: "Sad" })
    } else if (
      valence <= 0.71 &&
      valence >= 0.51 &&
      arousal <= -0.2 &&
      arousal >= -0.4
    ) {
      this.setState({ mood: "Hopeful" })
    } else if (
      valence <= 0.99 &&
      valence >= 0.79 &&
      arousal <= 0 &&
      arousal >= -0.2
    ) {
      this.setState({ mood: "Pleased" })
    } else {
      this.setState({ mood: "" })
    }
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
            <Header
              className="h1"
              size="huge"
              textAlign="center"
              style={{ color: "rgb(171, 218, 225)" }}
            >
              {this.state.mood ? this.state.mood : null}
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
