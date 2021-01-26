import React from "react"
import { Parallax, ParallaxBanner } from "react-scroll-parallax"
import { Grid, Header, Image, List } from "semantic-ui-react"
import resourceImage from "../assets/images/profilebackground.jpeg"
import Background1 from "../assets/images/profileBackground2.jpeg"

class ResourcesPage extends React.Component {
  render() {
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
          <Header style={{ color: "rgb(171, 218, 225)" }}>
            Building Emotional Intelligence in Children
          </Header>
        </div>
        <Grid centered celled="internally">
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src={resourceImage} />
            </Grid.Column>
            <Grid.Column width={10}>
              <Header textAlign="center" size="huge">
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
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src={resourceImage} />
            </Grid.Column>
            <Grid.Column width={10}>
              <Header textAlign="center" size="huge">
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
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}
export default ResourcesPage
