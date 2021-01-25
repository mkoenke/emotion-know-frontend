import React from "react"
import { Grid } from "semantic-ui-react"
import CardClass from "./CardClass"

class WelcomePageGrid extends React.Component {
  cardObjects = () => {
    return [
      {
        id: 1,
        header: "Record a Video Journal",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.l9T2fA4HUL7SB4NNRDG2lAHaHa%26pid%3DApi&f=1",
        description: "Express Yourself!  Record a Video Journal!",
        url: "./webcam",
      },
      {
        id: 2,
        header: "Record an Audio Journal",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.1gHLVwGFlV82VbreeTh_OQHaHa%26pid%3DApi&f=1",
        description: "Express Yourself!  Record an Audio Journal!",
        url: "./audio",
      },
      {
        id: 3,
        header: "Write a Journal Entry",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.fGHvS_YFT4u5MXXA_s2fDAHaHa%26pid%3DApi&f=1",
        description:
          "Express Yourself!  Write a Journal Entry the old school way!",
        url: "./write",
      },
      {
        id: 4,
        header: "Video Gallery",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.cZ_jqhXaUIp-_uUroQahIAHaHa%26pid%3DApi&f=1",
        description: "See all the videos you have recorded in the past!",
        url: "./videos",
      },
      {
        id: 5,
        header: "Audio Gallery",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.CZskoeFaP2XeH3Rqd1ceiAHaHa%26pid%3DApi&f=1",
        description: "See all the audios you have recorded in the past!",
        url: "./audios",
      },
      {
        id: 6,
        header: "Written Journal Gallery",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ikkJdaCOvsuuwHSUIvT4FQHaHa%26pid%3DApi&f=1",
        description: "See all the journals you have written in the past!",
        url: "./journals",
      },
      {
        id: 7,
        header: "Report Gallery",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.jyH3x6SEemM9C7Yys7DDpQHaHa%26pid%3DApi&f=1",
        description: "Check out how you have been feeling lately!",
        url: "./reports",
      },
    ]
  }
  arrayOfCards = () => {
    return this.cardObjects().map((card) => {
      return (
        <Grid.Column>
          <CardClass centered key={card.id} cardObj={card} />
        </Grid.Column>
      )
    })
  }
  render() {
    return (
      <Grid centered columns="three">
        <Grid.Row>{this.arrayOfCards()}</Grid.Row>
      </Grid>
    )
  }
}

export default WelcomePageGrid
