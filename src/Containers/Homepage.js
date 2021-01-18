import React from "react"
import { Parallax, ParallaxBanner } from "react-scroll-parallax"
import Background1 from "../assets/images/background1mod5.jpeg"
import Background2 from "../assets/images/background2mod5.jpeg"
import Background3 from "../assets/images/background3mod5.jpeg"

class Homepage extends React.Component {
  render() {
    const copy = "EmotionKnow".split("")
    return (
      <>
        <ParallaxBanner
          layers={[
            {
              image: Background1,
              amount: 0.3,
            },
          ]}
          style={{ height: "500px" }}
        ></ParallaxBanner>
        <div className="root">
          <span className={`copy h1`}>
            <Parallax x={[-80, 80]} className="letter">
              EmotionKnow
            </Parallax>
          </span>
        </div>
        <ParallaxBanner
          layers={[
            {
              image: Background2,
              amount: 0.3,
            },
          ]}
          style={{ height: "500px" }}
        ></ParallaxBanner>
        <div className="root">
          <span className={`copy h1`}>
            <Parallax x={[80, -80]} className="letter">
              Sign Up!
            </Parallax>
          </span>
        </div>
        <ParallaxBanner
          layers={[
            {
              image: Background3,
              amount: 0.3,
            },
          ]}
          style={{ height: "500px" }}
        ></ParallaxBanner>
      </>
    )
  }
}

export default Homepage
