import React from "react"
import { Grid } from "semantic-ui-react"
import WelcomeCard from "./WelcomeCard"

class WelcomePageGrid extends React.Component {
  cardObjects = () => {
    return [
      {
        id: 1,
        header: "Record a Video Journal",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.MSrtoPrH9kHv-BZZN0lxaQHaFj%26pid%3DApi&f=1",
        description: "Express Yourself!  Record a Video Journal!",
        url: "./webcam",
      },
      {
        id: 2,
        header: "Record an Audio Journal",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.DQLG4El8ZHT8TBEfZVCKDQHaFH%26pid%3DApi&f=1",
        description: "Express Yourself!  Record an Audio Journal!",
        url: "./audio",
      },
      {
        id: 3,
        header: "Write a Journal Entry",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.H3VicDrGYoO-AEAprbGwWwHaE9%26pid%3DApi&f=1",
        description:
          "Express Yourself!  Write a Journal Entry the old school way!",
        url: "./write",
      },
      {
        id: 4,
        header: "Video Gallery",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.PfS5CXHFtJh9BfxiKwWb5AHaE8%26pid%3DApi&f=1",
        description: "See all the videos you have recorded in the past!",
        url: "./videos",
      },
      {
        id: 5,
        header: "Audio Gallery",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.IgctWLSfyfBsO1tTLDLGrQHaE8%26pid%3DApi&f=1",
        description: "See all the audios you have recorded in the past!",
        url: "./audios",
      },
      {
        id: 6,
        header: "Written Journal Gallery",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Isk3IG02axUKbCPGog6eFAHaFl%26pid%3DApi&f=1",
        description: "See all the journals you have written in the past!",
        url: "./journals",
      },
      {
        id: 7,
        header: "Report Gallery",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.gbexKwEXOxemYUHalc97HwHaE6%26pid%3DApi&f=1",
        description: "Check out how you have been feeling lately!",
        url: "./reports",
      },
      {
        id: 8,
        header: "Fun with Emotions",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7Uu6X_8FavpM--P0p6U9pAAAAA%26pid%3DApi&f=1",
        description: "Lets see what emotions you are expressing!",
        url: "./fun",
      },
    ]
  }
  arrayOfCards = () => {
    return this.cardObjects().map((card) => {
      return (
        <Grid.Column centered>
          <WelcomeCard key={card.id} cardObj={card} />
        </Grid.Column>
      )
    })
  }
  render() {
    return (
      <Grid centered columns="three">
        <Grid.Row centered>{this.arrayOfCards()}</Grid.Row>
      </Grid>
    )
  }
}

export default WelcomePageGrid
