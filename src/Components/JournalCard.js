import React from "react"
import Animista, { AnimistaTypes } from "react-animista"
import Flippy, { BackSide, FrontSide } from "react-flippy"
// import { NavLink } from "react-router-dom"
import { Button, Card, Image, Popup } from "semantic-ui-react"

class JournalCard extends React.Component {
  render() {
    return (
      <>
        <Animista type={AnimistaTypes.SCALE_UP_CENTER}>
          <Flippy flipOnClick={true}>
            <FrontSide>
              <Card id={this.props.cardObj.id} centered>
                <Card.Content>
                  <Card.Header textAlign="center">
                    {this.props.cardObj.title}
                  </Card.Header>
                  <Image
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mhaYy171K74k3WtSxfBZaQHaHJ%26pid%3DApi&f=1"
                    // wrapped
                    size="medium"
                    circular
                    // ui={false}
                  />
                </Card.Content>
                <Popup
                  content="Warning!  This will delete this journal entry!"
                  trigger={<Button icon="close" />}
                />
              </Card>
            </FrontSide>
            <BackSide>
              <Card>
                <Card.Content>
                  <Card.Description textAlign="center">
                    {this.props.cardObj.content}
                  </Card.Description>
                </Card.Content>
              </Card>
            </BackSide>
          </Flippy>{" "}
        </Animista>
      </>
    )
  }
}

export default JournalCard
