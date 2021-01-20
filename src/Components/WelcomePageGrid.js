import React from "react"
import { Card, Grid } from "semantic-ui-react"

class WelcomePageGrid extends React.Component {
  //   cardObjects = () => {
  //     return [
  //       {
  //         id: 1,
  //         header: "Record a Video",
  //         image:
  //           "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.l9T2fA4HUL7SB4NNRDG2lAHaHa%26pid%3DApi&f=1",
  //         description: "Express Yourself!  Record a Video Journal!",
  //       },
  //       {
  //         id: 2,
  //         header: "Video Gallery",
  //         image:
  //           "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.cZ_jqhXaUIp-_uUroQahIAHaHa%26pid%3DApi&f=1",
  //         description: "See all the videos you have recorded!",
  //       },
  //       {
  //         id: 3,
  //         header: "Report Gallery",
  //         image:
  //           "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.jyH3x6SEemM9C7Yys7DDpQHaHa%26pid%3DApi&f=1",
  //         description: "Check out how you have been feeling lately!",
  //       },
  //     ]
  //   }
  //   arrayOfCards = () => {
  //     return this.cardObjects().map((card) => {
  //       return (
  //         <Grid.Column>
  //           <CardClass centered key={card.id} cardObj={card} />
  //         </Grid.Column>
  //       )
  //     })
  //   }
  render() {
    const items = [
      {
        id: 1,
        header: "Record a Video",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.l9T2fA4HUL7SB4NNRDG2lAHaHa%26pid%3DApi&f=1",
        description: "Express Yourself!  Record a Video Journal!",
      },
      {
        id: 2,
        header: "Video Gallery",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.cZ_jqhXaUIp-_uUroQahIAHaHa%26pid%3DApi&f=1",
        description: "See all the videos you have recorded!",
      },
      {
        id: 3,
        header: "Report Gallery",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.jyH3x6SEemM9C7Yys7DDpQHaHa%26pid%3DApi&f=1",
        description: "Check out how you have been feeling lately!",
      },
    ]
    return (
      <Grid centered columns="three">
        <Grid.Row>
          {/* {this.arrayOfCards()} */}
          <Card.Group centered items={items} />
        </Grid.Row>
      </Grid>
    )
  }
}

export default WelcomePageGrid
