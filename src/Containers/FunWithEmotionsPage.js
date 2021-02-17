/* global CY */

import { Bar } from "@reactchartjs/react-chart.js"
import React from "react"
import { connect } from "react-redux"
import Webcam from "react-webcam"
import { Grid, Header, Loader, Message } from "semantic-ui-react"
// import { startSDK, stopSDK } from "../App"

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
      // .addModule(CY.modules().FACE_AROUSAL_VALENCE.name)
      .load()
      .then(({ start, stop }) => {
        start()
        this.stopSDK = stop
      })
    // startSDK()

    window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
      this.setState({
        emo: evt.detail.output.dominantEmotion,
        anger: evt.detail.output.rawEmotion.Angry,
        disgust: evt.detail.output.rawEmotion.Disgust,
        fear: evt.detail.output.rawEmotion.Fear,
        joy: evt.detail.output.rawEmotion.Happy,
        sadness: evt.detail.output.rawEmotion.Sad,
        surprise: evt.detail.output.rawEmotion.Surprise,
      })
    })
    // window.addEventListener(
    //   CY.modules().FACE_AROUSAL_VALENCE.eventName,
    //   (evt) => {
    //     this.setState({
    //       arousal: evt.detail.output.arousalvalence.arousal,
    //       valence: evt.detail.output.arousalvalence.valence,
    //     })
    //     let arousal = evt.detail.output.arousalvalence.arousal
    //     let valence = evt.detail.output.arousalvalence.valence
    //     // this.calculateCoordinates(arousal, valence)
    //     this.findEmotion(arousal, valence)
    //   }
    // )
  }

  componentWillUnmount() {
    this.stopSDK()
    // stopSDK()
  }

  render() {
    const videoConstraints = {
      facingMode: "user",
    }

    let data = {
      labels: ["Anger", "Disgust", "Fear", "Joy", "Sadness", "Surprise"],
      datasets: [
        {
          label: `What does your face show?`,
          data: [
            parseFloat(this.state.anger),
            parseFloat(this.state.disgust),
            parseFloat(this.state.fear),
            parseFloat(this.state.joy),
            parseFloat(this.state.sadness),
            parseFloat(this.state.surprise),
          ],
          backgroundColor: [
            "rgb(255, 0, 0)",
            "rgb(255, 128, 0)",
            "rgb(0, 255, 0)",
            "rgb(255, 255, 0)",
            "rgb(0, 0, 255)",
            "rgb(127, 0, 255)",
          ],
          borderColor: [
            "rgba(255, 0, 0, 0.2)",
            "rgba(255, 128, 0, 0.2)",
            "rgba(0, 255, 0, 0.2)",
            "rgba(255, 255, 0, 0.2)",
            "rgba(0, 0, 255, 0.2)",
            "rgba(127, 0, 255, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    }

    return (
      <>
        {!this.props.parent && this.props.child ? (
          <>
            <div className="pattern">
              <Header className="pageHeader" size="huge" textAlign="center">
                Let's make some funny faces, {this.props.child.username}!
              </Header>

              <Grid centered className="videoGrid">
                <Webcam
                  className="webcam"
                  videoConstraints={videoConstraints}
                />
              </Grid>

              <Header className="waitOrDom" size="huge" textAlign="center">
                {this.state.emo ? (
                  <>
                    Dominant Emotion: {this.state.emo}
                    <Grid centered>
                      <div className="funGraphDiv">
                        <Bar
                          data={data}
                          width={700}
                          height={320}
                          options={{ maintainAspectRatio: false }}
                        />
                      </div>
                    </Grid>
                  </>
                ) : (
                  <>
                    <p>Please wait a moment...</p> <Loader active inline />
                  </>
                )}
              </Header>

              {/* <Header
              className="h1"
              size="huge"
              textAlign="center"
              style={{ color: "rgb(171, 218, 225)" }}
            >
              {this.state.mood ? this.state.mood : null}
            </Header> */}
              <div className="footer" />
            </div>
          </>
        ) : null}
        <Message positive className="removeMargin">
          <Message.Header>Your privacy is important to us!</Message.Header>
          <p>
            MorphCast is a patented technology using facial analysis to adapt
            content to the viewer in real-time whilst protecting their privacy.
            The software runs directly in your browser and emotions are found
            based on Deep Neural Network AI, able to analyse facial expressions.
            The only data that is stored, is what you choose to store when you
            upload!
          </p>
        </Message>
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
