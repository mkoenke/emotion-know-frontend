import React from "react"
import { Card, Grid } from "semantic-ui-react"
import videoGalleryImage from "../assets/images/3rainbowStacked.jpg"
import funWithEmotions from "../assets/images/funWithEmotions.jpg"
import reportImage from "../assets/images/pencilBar.jpeg"
import galleryImage from "../assets/images/rainbowBlockPyramid.jpg"
import videoImage from "../assets/images/rainbowBlocks.jpg"
import audioImage from "../assets/images/stackedRainbowBlocks.jpg"
import journalImage from "../assets/images/stackedRainbowBlocksWithHand.jpg"
import audioGalleryImage from "../assets/images/threeRainbowBlocks.jpg"
import WelcomeCard from "./WelcomeCard"

class WelcomePageGrid extends React.Component {
  cardObjects = () => {
    return [
      {
        id: 1,
        header: "Record a Video Journal",
        image: videoImage,
        description: "Express Yourself!  Record a Video Journal!",
        url: "./webcam",
      },
      {
        id: 2,
        header: "Record an Audio Journal",
        image: audioImage,

        description: "Express Yourself!  Record an Audio Journal!",
        url: "./audio",
      },
      {
        id: 3,
        header: "Write a Journal Entry",
        image: journalImage,

        description:
          "Express Yourself!  Write a Journal Entry the old school way!",
        url: "./write",
      },
      {
        id: 4,
        header: "Video Gallery",
        image: videoGalleryImage,

        description: "See all the videos you have recorded in the past!",
        url: "./videos",
      },
      {
        id: 5,
        header: "Audio Gallery",
        image: audioGalleryImage,

        description: "See all the audios you have recorded in the past!",
        url: "./audios",
      },
      {
        id: 6,
        header: "Written Journal Gallery",
        image: galleryImage,

        description: "See all the journals you have written in the past!",
        url: "./journals",
      },
      {
        id: 7,
        header: "Report Gallery",
        image: reportImage,
        description: "Check out how you have been feeling lately!",
        url: "./reports",
      },
      {
        id: 8,
        header: "Fun with Emotions",
        image: funWithEmotions,
        description: "Lets see what emotions you are expressing!",
        url: "./fun",
      },
    ]
  }
  arrayOfCards = () => {
    return this.cardObjects().map((card) => {
      return (
        <Grid.Column>
          <WelcomeCard key={card.id} cardObj={card} />
        </Grid.Column>
      )
    })
  }
  render() {
    return (
      <Card.Group>
        <Grid centered columns="three" className="background">
          {/* <Card.Group> */}
          <Grid.Row className="shift">{this.arrayOfCards()}</Grid.Row>
          {/* </Card.Group> */}
        </Grid>
      </Card.Group>
    )
  }
}

export default WelcomePageGrid
