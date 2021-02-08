/* global CY */

import React from "react"
import { connect } from "react-redux"
import Webcam from "react-webcam"
import { Grid, Header } from "semantic-ui-react"

class FunWithEmotionsPage extends React.Component {
  state = {
    emo: "",
  }
  componentDidMount() {
    CY.loader()
      .licenseKey(process.env.sdkLicense)
      .addModule(CY.modules().FACE_EMOTION.name)
      // .addModule(CY.modules().FACE_AROUSAL_VALENCE.eventName)
      .load()
      .then(({ start, stop }) => start())
    window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
      this.setState({
        emo: evt.detail.output.dominantEmotion,
      })
    })
    // window.addEventListener(
    //   CY.modules().FACE_AROUSAL_VALENCE.eventName,
    //   (evt) => {
    //     console.log("Face arousal valence result", evt.detail)
    //   }
    // )
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
