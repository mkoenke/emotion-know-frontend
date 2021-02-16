import React from "react"
import { Parallax, ParallaxBanner } from "react-scroll-parallax"
import { Container, Header } from "semantic-ui-react"
import handWith3Blocks from "../assets/images/handWith3Blocks.jpg"
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
    return (
      <div className="background">
        <ParallaxBanner
          layers={[
            {
              image: handWithBlock,
              amount: 0.3,
            },
          ]}
          className="homepageBannerHeight"
        ></ParallaxBanner>

        <div>
          <div className="root height">
            <span className={`copy h1`}>
              <Parallax x={[-80, 80]} className="letter">
                EmotionKnow
              </Parallax>
            </span>
            <Header className="subHeader" size="large">
              Building Emotional Intelligence in Children
            </Header>
          </div>
        </div>
        <ParallaxBanner
          layers={[
            {
              image: handWithBlocks,
              amount: 0.3,
            },
          ]}
          className="homepageBannerHeight"
        ></ParallaxBanner>
        <div>
          <Container className="homepageContainer">
            <div className="homepageText center">Welcome to EmotionKnow!</div>
            <div className="homepageText">
              For chidren, we are here to support you in your emotional growth!
              Say goodbye to traditional diaries and journals, and say hello to
              options, privacy, and emotional feedback! You can choose to record
              a video, record your voice, or write a journal entry, see all the
              journals you have created, and see what emotions you have
              expressed in your journal entries. We provide feedback on the
              universal emotions of Joy, Surprise, Sadness, Disgust, Anger, and
              Fear. Now you have an easy way to keep track of how you have been
              feeling! And don't forget to check out the Fun With Emotions Page
              to see what emotions you can express with your face in real time!
              You are beautifully emotionally intelligent!
            </div>
            <div className="homepageText">
              For parents, we are committed to helping parents stay in the loop
              with how their child is feeling. Log in to your portal to see the
              emotional reports generated from your child's journal entries. We
              want to help you stay attuned to your child’s wellbeing, providing
              an overall sense of connectedness and advanced communication
              during pivotal stages of development.
            </div>
          </Container>
        </div>

        <ParallaxBanner
          layers={[
            {
              image: handWith3Blocks,
              amount: 0.3,
            },
          ]}
          className="homepageBannerHeight"
        ></ParallaxBanner>
        <div className="root height">
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
          className="homepageBannerHeight"
        ></ParallaxBanner>
      </div>
    )
  }
}

export default Homepage
