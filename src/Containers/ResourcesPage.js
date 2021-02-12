import React from "react"
import { Parallax, ParallaxBanner } from "react-scroll-parallax"
import { Grid, Header, List } from "semantic-ui-react"
import resourceImage2 from "../assets/images/kidsPaperFamily.jpg"
import resourceImage from "../assets/images/paperFamily.jpg"

class ResourcesPage extends React.Component {
  render() {
    return (
      <>
        <ParallaxBanner
          layers={[
            {
              image: resourceImage,
              amount: 0.3,
            },
          ]}
          style={{ height: "400px" }}
        ></ParallaxBanner>
        <div className="root">
          <span className={`copy h1`}>
            <Parallax x={[-80, 80]} className="letter">
              EmotionKnow
            </Parallax>
          </span>
          <span className={`copy h1`} style={{ marginTop: "40px" }}>
            <Parallax x={[-80, 80]} className="letter">
              Resources
            </Parallax>
          </span>
          <Header style={{ color: "rgb(171, 218, 225)" }} className="resources">
            Building Emotional Intelligence in Children
          </Header>
        </div>

        <Grid
          centered
          celled="internally"
          // style={{ marginBottom: "100px" }}
          className="resources"
        >
          <Grid.Row>
            <Grid.Column width={5}>
              <Header textAlign="center" size="huge" className="resources">
                Child Resources
              </Header>
              <List bulleted>
                <List.Item href="https://childhood101.com/which-emotion-am-i-exploring-emotions-guessing-game/">
                  Which Emotion Am I? Exploring Emotions Guessing Game
                </List.Item>
                <List.Item href="https://childhood101.com/calm-down-bottle/">
                  Slow Motion Calm Down Sensory Bottle
                </List.Item>
                <List.Item href="https://eqforchildren.com/cjs-kids-club/the-cj-kids-club/">
                  The CJ Kids Club
                </List.Item>
                <List.Item href="https://gozen.com/ref/42/?campaign=Home">
                  GoZen
                </List.Item>
                <List.Item href="https://thesocialinstitute.com/">
                  The Social Institute
                </List.Item>
                <List.Item href="https://nourishingmyscholar.com/social-emotional-intelligence/">
                  Nourishing My Scholar Books List
                </List.Item>
                <List.Item href="https://positivepsychology.com/emotional-intelligence-exercises/">
                  13 Emotional Intelligence Activities & Exercises
                </List.Item>
                <List.Item href="https://www.thepathway2success.com/free-social-emotional-learning-resources/">
                  The Pathway 2 Success
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header textAlign="center" size="huge" className="resources">
                Parent Resources
              </Header>
              <List bulleted>
                <List.Item href="https://www.psychologytoday.com/us/blog/compassion-matters/201603/why-we-need-teach-kids-emotional-intelligence">
                  Why We Need to Teach Kids Emotional Intelligence
                </List.Item>
                <List.Item href="https://www.naeyc.org/resources/pubs/yc/mar2017/teaching-emotional-intelligence">
                  Teaching Emotional Intelligence in Early Childhood
                </List.Item>
                <List.Item href="https://genmindful.com/">
                  Generation Mindful
                </List.Item>
                <List.Item href="https://www.mindfullittleminds.com/">
                  Mindful Little Minds
                </List.Item>
                <List.Item href="https://www.ahaparenting.com/parenting-tools/emotional-intelligence/steps-to-encourage">
                  5 Steps to Nurture Emotional Intelligence in Your Child
                </List.Item>
                <List.Item href="https://www.positiveparentingsolutions.com/parenting/positive-parenting-techniques">
                  5 Positive Parenting Techniques
                </List.Item>
                <List.Item href="https://www.positiveparentingsolutions.com/parenting/get-kids-to-listen">
                  How to Get Kids to (REALLY) Listen
                </List.Item>
                <List.Item href="https://www.positiveparentingsolutions.com/parenting/what-is-positive-parenting">
                  What is Positive Parenting? Does it Work?
                </List.Item>
                <List.Item href="https://www.positiveparentingsolutions.com/parenting/how-to-discipline-your-child">
                  How to Discipline Your Child
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div
          style={{ dispaly: "block", height: "300px" }}
          className="resources"
        />
        <ParallaxBanner
          layers={[
            {
              image: resourceImage2,
              amount: 0.3,
            },
          ]}
          style={{ height: "400px" }}
        ></ParallaxBanner>
        {/* <div
          style={{ dispaly: "block", height: "300px" }}
          className="resources"
        /> */}
      </>
    )
  }
}
export default ResourcesPage
