import React from "react"
import { Parallax, ParallaxBanner } from "react-scroll-parallax"
import { Container, Header } from "semantic-ui-react"
import handWithBlock from "../assets/images/handWithBlock.jpg"
import handWithBlocks from "../assets/images/handWithBlocks.jpg"
import handWithVerticalBlocks from "../assets/images/handWithVerticalBlocks.jpg"
import SignUpModal from "../Components/SignUpModal"

class Homepage extends React.Component {
  state = {
    modalView: false,
  }
  handleSignUpClick = () => {
    this.setState({ modalView: !this.state.modalView })
  }
  setViewModalStateToFalse = () => {
    if (this.state.modalView) {
      this.setState({ modalView: false })
    }
  }
  render() {
    console.log(this.state)
    return (
      <div className="pusher">
        <ParallaxBanner
          layers={[
            {
              image: handWithBlock,
              amount: 0.3,
            },
          ]}
          style={{ height: "500px" }}
        ></ParallaxBanner>
        {/* <Container className="background"> */}
        <div className="root">
          <span className={`copy h1`}>
            <Parallax x={[-80, 80]} className="letter">
              EmotionKnow
            </Parallax>
          </span>
          <Header
            style={{
              color: "rgb(171, 218, 225)",
              fontFamily: "Comic Sans MS",
            }}
            size="large"
          >
            Building Emotional Intelligence in Children
          </Header>

          <Container className="homepageContainer">
            <div className="homepageText">
              EmotionKnow is an online journaling application for children with
              written, audio, and video journaling methods providing feedback on
              universal emotions to children and parents. Input from the child
              is evaluated by MorphCast SDK or TwinWord API reporting data in
              graph form on emotional states expressed.
            </div>
            <div className="homepageText">
              Children and parents have separate portals so children have access
              to a history of their recordings and the corresponding graphical
              representation of emotions whereas parents only have access to the
              graphical representation.
            </div>
            <div className="homepageText">
              EmotionKnow is intended to help children grow in emotional
              intelligence and help parents stay attuned to their child’s
              wellbeing, providing an overall sense of connectedness and
              advanced communication during pivotal stages of development.
            </div>
          </Container>
        </div>
        {/* </Container> */}
        <ParallaxBanner
          layers={[
            {
              image: handWithBlocks,
              amount: 0.3,
            },
          ]}
          style={{ height: "500px" }}
        ></ParallaxBanner>
        <div className="root">
          <span className={`copy h1`} onClick={this.handleSignUpClick}>
            <Parallax x={[80, -80]} className="letter link">
              Sign Up!
            </Parallax>
          </span>
        </div>
        {this.state.modalView && (
          <SignUpModal
            setViewModalStateToFalse={this.setViewModalStateToFalse}
          />
        )}
        <ParallaxBanner
          layers={[
            {
              image: handWithVerticalBlocks,
              amount: 0.3,
            },
          ]}
          style={{ height: "500px" }}
        ></ParallaxBanner>
      </div>
    )
  }
}

export default Homepage
